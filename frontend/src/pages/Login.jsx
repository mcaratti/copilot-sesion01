import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import GradientMesh from '../components/GradientMesh';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/welcome', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <GradientMesh />

      <div className={styles.card}>
        {/* Logo / wordmark */}
        <div className={styles.logo}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="8" fill="#533afd" />
            <path
              d="M10 22 L16 10 L22 22"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line
              x1="12"
              y1="18"
              x2="20"
              y2="18"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.logoText}>AuthApp</span>
        </div>

        <h1 className={styles.heading}>Sign in to your account</h1>
        <p className={styles.sub}>
          Enter your credentials to access the dashboard.
        </p>

        {error && (
          <div className={styles.errorBanner} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              disabled={loading}
              placeholder="admin"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading || !username || !password}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
