import html
import json
import logging
import re
from typing import Any, Dict

import groq  # pyrefly: ignore [missing-import] # type: ignore
from groq import Groq  # pyrefly: ignore [missing-import] # type: ignore

from core.config import settings  # pyrefly: ignore [missing-import] # type: ignore
from services.prompts import (
    COMPOSE_SYSTEM_PROMPT,
    IMPROVE_SYSTEM_PROMPT,
    REVIEW_SYSTEM_PROMPT,
    build_compose_user_prompt,
    build_improve_user_prompt,
    build_review_user_prompt,
)

logger = logging.getLogger("personamail.groq_service")
client = Groq(api_key=settings.GROQ_API_KEY)


class AIServiceException(Exception):
    def __init__(self, message: str, status_code: int = 503):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


def sanitize_text(text: str) -> str:
    """Strip dangerous HTML script tags while keeping plain-text characters like & intact."""
    if not isinstance(text, str):
        return text
    # Strip script blocks and HTML tag markup
    cleaned = re.sub(r"<script.*?>.*?</script>", "", text, flags=re.DOTALL | re.IGNORECASE)
    cleaned = re.sub(r"</?(?:script|iframe|object|embed|applet|style)[^>]*>", "", cleaned, flags=re.IGNORECASE)
    return cleaned.strip()


def parse_and_sanitize_json(raw_text: str, fallback_dict: Dict[str, Any]) -> Dict[str, Any]:
    """Clean markdown code fences, parse JSON output, enforce fallback keys, and sanitize string values."""
    text = raw_text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)
        text = text.strip()

    try:
        data = json.loads(text)
        if isinstance(data, dict):
            # Ensure all required fallback keys exist in the output dictionary
            result = {}
            for key, default_val in fallback_dict.items():
                val = data.get(key, default_val)
                result[key] = sanitize_text(val) if isinstance(val, str) else val
            return result
    except json.JSONDecodeError as exc:
        logger.warning(f"Failed to parse LLM JSON response: {exc}. Raw text: {raw_text[:200]}")

    return {k: sanitize_text(v) if isinstance(v, str) else v for k, v in fallback_dict.items()}


FALLBACK_MODELS = [
    settings.GROQ_MODEL,
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "groq/compound",
    "groq/compound-mini",
]


def _call_groq_chat_completion(messages: list[dict], temperature: float = 0.7) -> str:
    """Execute Groq chat completion with automatic model fallbacks for decommissioned/unavailable models."""
    # Deduplicate fallback models while preserving order
    candidate_models = list(dict.fromkeys(m for m in FALLBACK_MODELS if m))
    last_error = None

    for model_name in candidate_models:
        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=messages,
                response_format={"type": "json_object"},
                temperature=temperature,
            )
            return response.choices[0].message.content or ""
        except groq.RateLimitError as exc:
            logger.error(f"Groq API rate limit exceeded on model {model_name}: {exc}")
            raise AIServiceException("AI provider request limit reached. Please wait a moment before trying again.", status_code=429)
        except groq.BadRequestError as exc:
            # Model decommissioned or invalid request
            logger.warning(f"Groq BadRequestError with model {model_name}: {exc}. Trying next candidate model...")
            last_error = exc
            continue
        except groq.NotFoundError as exc:
            # Model not found or no access
            logger.warning(f"Groq NotFoundError with model {model_name}: {exc}. Trying next candidate model...")
            last_error = exc
            continue
        except (groq.APITimeoutError, groq.APIConnectionError) as exc:
            logger.error(f"Groq API timeout/connection error: {exc}")
            raise AIServiceException("AI service connection timed out. Please try again shortly.", status_code=503)
        except groq.GroqError as exc:
            logger.error(f"Groq API error on model {model_name}: {exc}")
            last_error = exc
            continue

    logger.error(f"All Groq candidate models failed. Last error: {last_error}")
    raise AIServiceException("Unable to process email AI request right now. Please try again.", status_code=503)


def generate_email(
    purpose: str,
    contact_name: str,
    relationship: str,
    tone: str,
    greeting: str | None,
    closing: str | None,
    notes: str | None,
) -> dict:
    user_prompt = build_compose_user_prompt(
        purpose=purpose,
        contact_name=contact_name,
        relationship=relationship,
        tone=tone,
        greeting=greeting,
        closing=closing,
        notes=notes,
    )

    try:
        raw_output = _call_groq_chat_completion(
            messages=[
                {"role": "system", "content": COMPOSE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7,
        )
        fallback = {"subject": "Generated Email", "body": raw_output}
        return parse_and_sanitize_json(raw_output, fallback)

    except AIServiceException:
        raise
    except Exception as exc:
        logger.error(f"Unexpected error during generate_email: {exc}")
        raise AIServiceException("An unexpected error occurred while generating your email.", status_code=500)


def rewrite_email(
    original_text: str,
    contact_name: str,
    relationship: str,
    tone: str,
    greeting: str | None,
    closing: str | None,
    notes: str | None,
) -> dict:
    user_prompt = build_improve_user_prompt(
        original_text=original_text,
        contact_name=contact_name,
        relationship=relationship,
        tone=tone,
        greeting=greeting,
        closing=closing,
        notes=notes,
    )

    try:
        raw_output = _call_groq_chat_completion(
            messages=[
                {"role": "system", "content": IMPROVE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7,
        )
        fallback = {"subject": "Improved Email", "body": raw_output}
        return parse_and_sanitize_json(raw_output, fallback)

    except AIServiceException:
        raise
    except Exception as exc:
        logger.error(f"Unexpected error during rewrite_email: {exc}")
        raise AIServiceException("An unexpected error occurred while improving your email.", status_code=500)


def check_grammar(text: str) -> dict:
    user_prompt = build_review_user_prompt(text)

    try:
        raw_output = _call_groq_chat_completion(
            messages=[
                {"role": "system", "content": REVIEW_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.3,
        )
        fallback = {"corrected_text": raw_output, "changes_summary": "Proofread text complete."}
        return parse_and_sanitize_json(raw_output, fallback)

    except AIServiceException:
        raise
    except Exception as exc:
        logger.error(f"Unexpected error during check_grammar: {exc}")
        raise AIServiceException("An unexpected error occurred while reviewing your email.", status_code=500)