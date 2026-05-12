# JWT Authentication API

FastAPI application that implements JWT-based authentication using **Poetry** for dependency management.

---

## Features

| Feature | Detail |
|---|---|
| Login endpoint | `POST /auth/token` – returns an access token (300 s) and a refresh token |
| Refresh endpoint | `POST /auth/refresh` – exchanges a refresh token for a new access token |
| Health check | `GET /health` |
| Interactive docs | Swagger UI at `/docs`, ReDoc at `/redoc` |

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py        # FastAPI application factory
│   ├── auth.py        # JWT creation / validation logic
│   ├── models.py      # Pydantic request/response models
│   └── routes.py      # API route handlers
├── tests/
│   └── test_auth.py   # Pytest test suite
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml     # Poetry project & dependency configuration
└── README.md
```

---

## Prerequisites

- **Python 3.11+**
- **Poetry** – [installation guide](https://python-poetry.org/docs/#installation)
- **Docker** and **Docker Compose** (only for containerised deployment)

---

## Local Development

### 1. Install dependencies

```bash
cd backend
poetry install
```

### 2. Run the development server

```bash
poetry run uvicorn app.main:app --reload
```

The API will be available at <http://localhost:8000>.  
Swagger UI: <http://localhost:8000/docs>

### 3. Run tests

```bash
poetry run pytest
```

---

## Docker Deployment

### Build and start

```bash
cd backend
docker compose up --build
```

The API is then exposed on **port 8000** of the host machine.

### Stop

```bash
docker compose down
```

---

## API Usage

### Login

**Request**

```bash
curl -X POST http://localhost:8000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**Response**

```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### Refresh Access Token

**Request**

```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<refresh_token_from_login>"}'
```

**Response**

```json
{
  "access_token": "<new_JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### Health Check

```bash
curl http://localhost:8000/health
```

```json
{"status": "ok"}
```

---

## Configuration

The following values can be customised directly in `app/auth.py`:

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | `change-me-in-production-…` | Secret used to sign JWTs. **Must be overridden** via the `SECRET_KEY` environment variable in production (e.g. `openssl rand -hex 32`). |
| `ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_SECONDS` | `300` | Access token lifetime (seconds) |
| `REFRESH_TOKEN_EXPIRE_SECONDS` | `86400` | Refresh token lifetime (seconds) |

> **Security note:** In a real production deployment the `SECRET_KEY` should be provided via an environment variable or a secrets manager, not hard-coded.

---

## Default Credentials

| Username | Password |
|---|---|
| `admin` | `admin123` |
