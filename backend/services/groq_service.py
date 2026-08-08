from groq import Groq
from core.config import settings
import json

client = Groq(api_key=settings.GROQ_API_KEY)

def generate_email(
    purpose: str,
    contact_name: str,
    relationship: str,
    tone: str,
    greeting: str | None,
    closing: str | None,
    notes: str | None,
) -> dict:
    prompt = f"""You are an email writing assistant. Generate a professional email based on these details:

Recipient: {contact_name} ({relationship})
Desired tone: {tone}
What the email should say: {purpose}
"""

    if greeting:
        prompt += f"\nUse this greeting style: {greeting}"
    if closing:
        prompt += f"\nUse this closing style: {closing}"
    if notes:
        prompt += f"\nAdditional context about this contact: {notes}"

    prompt += """

Respond ONLY in valid JSON with this exact structure, no markdown formatting, no code fences, no extra text:
{
  "subject": "a concise email subject line",
  "body": "the full email body, including greeting and closing"
}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    text = response.choices[0].message.content.strip()

    if text.startswith("```"):
        text = text.strip("`")
        if text.startswith("json"):
            text = text[4:]
        text = text.strip()

    try:
        result = json.loads(text)
    except json.JSONDecodeError:
        result = {"subject": "Generated Email", "body": text}

    return result

def rewrite_email(
    original_text: str,
    contact_name: str,
    relationship: str,
    tone: str,
    greeting: str | None,
    closing: str | None,
    notes: str | None,
) -> dict:
    prompt = f"""You are an email rewriting assistant. Rewrite the following email to match a specific tone and recipient, while preserving the original meaning and intent.

Recipient: {contact_name} ({relationship})
Desired tone: {tone}
"""

    if greeting:
        prompt += f"\nUse this greeting style: {greeting}"
    if closing:
        prompt += f"\nUse this closing style: {closing}"
    if notes:
        prompt += f"\nAdditional context about this contact: {notes}"

    prompt += f"""

Original email to rewrite:
\"\"\"
{original_text}
\"\"\"

Respond ONLY in valid JSON with this exact structure, no markdown formatting, no code fences, no extra text:
{{
  "subject": "a concise email subject line",
  "body": "the rewritten email body, including greeting and closing"
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    text = response.choices[0].message.content.strip()

    if text.startswith("```"):
        text = text.strip("`")
        if text.startswith("json"):
            text = text[4:]
        text = text.strip()

    try:
        result = json.loads(text)
    except json.JSONDecodeError:
        result = {"subject": "Rewritten Email", "body": text}

    return result


def check_grammar(text: str) -> dict:
    prompt = f"""You are a grammar and clarity checker. Review the following text and fix grammar, spelling, and clarity issues, without changing the tone, meaning, or intent.

Text to check:
\"\"\"
{text}
\"\"\"

Respond ONLY in valid JSON with this exact structure, no markdown formatting, no code fences, no extra text:
{{
  "corrected_text": "the corrected version of the text",
  "changes_summary": "a short 1-2 sentence summary of what was fixed"
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    text_out = response.choices[0].message.content.strip()

    if text_out.startswith("```"):
        text_out = text_out.strip("`")
        if text_out.startswith("json"):
            text_out = text_out[4:]
        text_out = text_out.strip()

    try:
        result = json.loads(text_out)
    except json.JSONDecodeError:
        result = {"corrected_text": text_out, "changes_summary": "Could not parse summary."}

    return result