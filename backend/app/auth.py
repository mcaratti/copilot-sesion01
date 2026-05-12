import os
from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

# Secret key for signing tokens. Override via the SECRET_KEY environment variable.
# In production, always set a strong random value (e.g. `openssl rand -hex 32`).
SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production-use-a-long-random-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 86400  # 1 day

# Password hashing context
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# Simulated user database with a pre-computed password hash.
# NOTE: This is for demonstration purposes only.
#       In production, store users and hashed passwords in a real database.
FAKE_USERS_DB: dict[str, str] = {
    # pbkdf2_sha256 hash of "admin123"
    "admin": "$pbkdf2-sha256$29000$hHBO6X2vNWbsHaP0fo8xRg$XiSxIC6s1LsDL3TEq0d6B/VBYgCIJR9cM4Pk77LMHe8",
}


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str) -> bool:
    hashed = FAKE_USERS_DB.get(username)
    if not hashed:
        return False
    return verify_password(password, hashed)


def create_token(
    subject: str,
    token_type: str,
    expires_in: int,
    extra_claims: Optional[dict] = None,
) -> str:
    now = datetime.now(tz=timezone.utc)
    payload: dict = {
        "sub": subject,
        "type": token_type,
        "iat": now,
        "exp": now + timedelta(seconds=expires_in),
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(username: str) -> str:
    return create_token(username, "access", ACCESS_TOKEN_EXPIRE_SECONDS)


def create_refresh_token(username: str) -> str:
    return create_token(username, "refresh", REFRESH_TOKEN_EXPIRE_SECONDS)


def decode_refresh_token(token: str) -> str:
    """Decode a refresh token and return the subject (username).

    Raises ValueError if the token is invalid or not a refresh token.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise ValueError("Invalid or expired refresh token") from exc

    if payload.get("type") != "refresh":
        raise ValueError("Provided token is not a refresh token")

    subject: Optional[str] = payload.get("sub")
    if not subject:
        raise ValueError("Refresh token has no subject")

    return subject
