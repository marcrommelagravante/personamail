# PersonaMail API Specification

Base URL in local development: `http://localhost:8000`.

Interactive OpenAPI documentation is available at `/docs`. Protected endpoints
require the `access_token` HTTP-only cookie; frontend requests must use
`credentials: "include"`.

## Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/auth/google/login` | Start Google OAuth |
| GET | `/auth/google/callback` | Receive OAuth callback and set session cookie |
| GET | `/auth/me` | Return the current user |
| POST | `/auth/logout` | Clear the session cookie |

## Contacts

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/contacts/` | List the current user’s contacts |
| POST | `/contacts/` | Create a contact profile |
| GET | `/contacts/{contact_id}` | Fetch one owned contact |
| PUT | `/contacts/{contact_id}` | Update one owned contact |
| DELETE | `/contacts/{contact_id}` | Delete one owned contact |

Contact creation requires `name`, `relationship`, and `tone`. Optional fields
are `email`, `greeting`, `closing`, and `notes`.

## Email actions

| Method | Endpoint | Request body | Response body |
| --- | --- | --- | --- |
| POST | `/email/generate` | `contact_id`, `purpose` | `subject`, `body` |
| POST | `/email/rewrite` | `contact_id`, `original_text` | `subject`, `body` |
| POST | `/email/grammar-check` | `text` | `corrected_text`, `changes_summary` |

These endpoints are combined under the per-user AI rate limit. When exceeded,
the API returns `429` with a `Retry-After` header.

## Templates

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/templates/` | List owned templates |
| POST | `/templates/` | Create a template |
| PUT | `/templates/{template_id}` | Update an owned template |
| DELETE | `/templates/{template_id}` | Delete an owned template |

Template fields are `name`, `subject`, and `body`; `relationship` and `tone` are
optional.

## History and settings

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/history/` | List the current user’s AI activity history |
| DELETE | `/history/{activity_id}` | Delete an owned history item |
| GET | `/settings/` | Return or initialize user preferences |
| PUT | `/settings/` | Update default tone, greeting, and closing |

## Error behavior

`401` means the session is missing or invalid. `404` means a resource does not
exist for the authenticated user. Validation failures return FastAPI’s `422`
response. AI rate limiting returns `429`.
