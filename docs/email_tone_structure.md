# Email Tone Structure Guide

This document defines the structure and formatting rules for the three tone options (**Formal**, **Friendly**, **Casual**) used in PersonaMail's Compose feature. Use this as a reference for prompt engineering, tone-specific templates, or output validation.

## Fixed Structure (applies to all tones)

Every generated email follows the same 7-part layout, regardless of tone:

1. Subject line
2. Salutation
3. Opening line
4. Body (purpose + details)
5. Closing ask / next step
6. Sign-off
7. Signature block

**Universal formatting rules:**
- One blank line between every section (salutation, each paragraph, sign-off, signature) — never cramped together
- Paragraphs stay short: 2–4 sentences, one idea per paragraph
- Subject line is specific, never vague (e.g. "Report" alone is too generic)
- Sign-off and name are separated by a blank line, not stacked
- Consistent tense throughout

What changes between tones is **word choice, sentence length, contraction use, and how much cushioning/signature detail is included** — not the overall shape.

---

## Formal

| Section | Guidance |
|---|---|
| Subject | Clear, professional. e.g. "Meeting Request: Q3 Budget Review" |
| Salutation | "Dear Mr./Ms. [Last Name]," or "Dear [Full Name]," |
| Opening | "I am writing to..." / "I hope this email finds you well." |
| Body | Full sentences, no contractions, formal transitions ("Furthermore," "In addition," "Please be advised that") |
| Closing ask | "I would appreciate it if you could..." / "Please let me know at your earliest convenience." |
| Sign-off | "Sincerely," / "Best regards," / "Respectfully," |
| Signature | Full name, title, company, contact info |

**Example:**

```
Subject: Request for Q3 Sales Report

Dear Mr. Santos,

I hope this email finds you well.

I am writing to request the Q3 sales report, which I understand has
recently been finalized. As we are preparing for Thursday's planning
meeting, I would like to review the figures beforehand to ensure our
discussion is well informed.

Could you kindly send the report over at your earliest convenience?
If there is any additional information you require from my end to
complete it, please do let me know, and I will provide it promptly.

Thank you very much for your time and assistance. I look forward to
receiving the report.

Sincerely,

Maria Cruz
Operations Manager
Salo sa Antipolo
```

---

## Friendly

| Section | Guidance |
|---|---|
| Subject | Clear but warmer. e.g. "Quick catch-up on Q3 budget?" |
| Salutation | "Hi [First Name]," / "Hello [First Name]," |
| Opening | "Hope you're doing well!" / "Hope you had a good weekend." |
| Body | Complete sentences, contractions okay, still organized, softer transitions ("Also," "On another note") |
| Closing ask | "Would you be able to...?" / "Let me know if that works for you." |
| Sign-off | "Best," / "Warm regards," / "Thanks so much," |
| Signature | First name, optional light title |

**Example:**

```
Subject: Quick request — Q3 sales report

Hi Miguel,

Hope you're doing well!

I heard the Q3 sales report is finished — would you be able to send
it my way when you get a chance? I'd like to go through the figures
before our planning meeting on Thursday, so sometime before then
would be great.

Let me know if you need anything from me to help wrap it up.

Thanks so much!

Best,
Maria
```

---

## Casual

| Section | Guidance |
|---|---|
| Subject | Short, plain. e.g. "Q3 budget – got a sec?" |
| Salutation | "Hey [First Name]," / "Hi [Name]," |
| Opening | Optional or skipped — jump straight to the point |
| Body | Short sentences/fragments okay, contractions everywhere, bullets for multiple items, casual connectors ("Oh, and," "Quick thing —") |
| Closing ask | "Can you send that over when you get a chance?" / "Let me know!" |
| Sign-off | "Thanks!" / "Cheers," / "Talk soon," |
| Signature | First name only, no formal block |

**Example:**

```
Subject: Q3 report – got a sec?

Hey Miguel,

Heard the Q3 report's done — mind sending it over when you get a
chance? Want to look it over before Thursday's meeting.

Let me know if you need anything from me first!

Thanks!

Maria
```

---

## Implementation Notes

- The 7-part structure can be encoded as a fixed template; only the tone-specific phrasing/wording rules need to vary per selection (Formal / Friendly / Casual).
- Signature block detail scales down with tone: Formal keeps full name + title + company, Friendly keeps first name + optional title, Casual drops it to first name only.
- This structure applies to the **Compose** (generate) feature. The **Improve** (rewrite) feature would take an existing draft and re-map it into one of these three structures/tones rather than generating fresh content.