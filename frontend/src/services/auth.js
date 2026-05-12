const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
const SESSION_KEY = 'auth_token';

/**
 * Attempt login with username/password.
 * Stores the access token in sessionStorage on success.
 * @returns {Promise<{access_token: string, token_type: string, expires_in: number}>}
 * @throws {Error} with a user-facing message on failure
 */
export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail ?? 'Incorrect username or password');
  }

  const data = await res.json();
  sessionStorage.setItem(SESSION_KEY, data.access_token);
  sessionStorage.setItem('auth_username', username);
  return data;
}

/** Remove auth state from session. */
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem('auth_username');
}

/** Return the stored access token, or null if not logged in. */
export function getToken() {
  return sessionStorage.getItem(SESSION_KEY);
}

/** Return the logged-in username, or null. */
export function getUsername() {
  return sessionStorage.getItem('auth_username');
}

/** Return true if a token is present in session. */
export function isAuthenticated() {
  return Boolean(getToken());
}
