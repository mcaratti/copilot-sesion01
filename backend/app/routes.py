from fastapi import APIRouter, HTTPException, status

from app.auth import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.models import LoginRequest, RefreshRequest, RefreshResponse, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/token", response_model=TokenResponse, summary="Login and obtain tokens")
def login(credentials: LoginRequest) -> TokenResponse:
    """Authenticate with username and password and receive a JWT access token
    (valid for 300 seconds) together with a refresh token."""
    if not authenticate_user(credentials.username, credentials.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(credentials.username)
    refresh_token = create_refresh_token(credentials.username)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=ACCESS_TOKEN_EXPIRE_SECONDS,
    )


@router.post(
    "/refresh",
    response_model=RefreshResponse,
    summary="Refresh the access token",
)
def refresh_token(body: RefreshRequest) -> RefreshResponse:
    """Exchange a valid refresh token for a new access token."""
    try:
        username = decode_refresh_token(body.refresh_token)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    new_access_token = create_access_token(username)

    return RefreshResponse(
        access_token=new_access_token,
        expires_in=ACCESS_TOKEN_EXPIRE_SECONDS,
    )
