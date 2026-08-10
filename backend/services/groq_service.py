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
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": COMPOSE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
        )
        raw_output = response.choices[0].message.content or ""
        fallback = {"subject": "Generated Email", "body": raw_output}
        return parse_and_sanitize_json(raw_output, fallback)

    except groq.RateLimitError as exc:
        logger.error(f"Groq API rate limit exceeded: {exc}")
        raise AIServiceException("AI provider request limit reached. Please wait a moment before trying again.", status_code=429)
    except (groq.APITimeoutError, groq.APIConnectionError) as exc:
        logger.error(f"Groq API timeout/connection error: {exc}")
        raise AIServiceException("AI service connection timed out. Please try again shortly.", status_code=503)
    except groq.GroqError as exc:
        logger.error(f"Groq API error during generate_email: {exc}")
        raise AIServiceException("Unable to generate email right now. Please try again.", status_code=503)
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
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": IMPROVE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
        )
        raw_output = response.choices[0].message.content or ""
        fallback = {"subject": "Improved Email", "body": raw_output}
        return parse_and_sanitize_json(raw_output, fallback)

    except groq.RateLimitError as exc:
        logger.error(f"Groq API rate limit exceeded: {exc}")
        raise AIServiceException("AI provider request limit reached. Please wait a moment before trying again.", status_code=429)
    except (groq.APITimeoutError, groq.APIConnectionError) as exc:
        logger.error(f"Groq API timeout/connection error: {exc}")
        raise AIServiceException("AI service connection timed out. Please try again shortly.", status_code=503)
    except groq.GroqError as exc:
        logger.error(f"Groq API error during rewrite_email: {exc}")
        raise AIServiceException("Unable to improve email right now. Please try again.", status_code=503)
    except Exception as exc:
        logger.error(f"Unexpected error during rewrite_email: {exc}")
        raise AIServiceException("An unexpected error occurred while improving your email.", status_code=500)


def check_grammar(text: str) -> dict:
    user_prompt = build_review_user_prompt(text)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": REVIEW_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        raw_output = response.choices[0].message.content or ""
        fallback = {"corrected_text": raw_output, "changes_summary": "Proofread text complete."}
        return parse_and_sanitize_json(raw_output, fallback)

    except groq.RateLimitError as exc:
        logger.error(f"Groq API rate limit exceeded: {exc}")
        raise AIServiceException("AI provider request limit reached. Please wait a moment before trying again.", status_code=429)
    except (groq.APITimeoutError, groq.APIConnectionError) as exc:
        logger.error(f"Groq API timeout/connection error: {exc}")
        raise AIServiceException("AI service connection timed out. Please try again shortly.", status_code=503)
    except groq.GroqError as exc:
        logger.error(f"Groq API error during check_grammar: {exc}")
        raise AIServiceException("Unable to review email right now. Please try again.", status_code=503)
    except Exception as exc:
        logger.error(f"Unexpected error during check_grammar: {exc}")
        raise AIServiceException("An unexpected error occurred while reviewing your email.", status_code=500)