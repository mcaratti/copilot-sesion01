import { useNavigate } from 'react-router-dom';
import { logout, getUsername } from '../services/auth';
import GradientMesh from '../components/GradientMesh';
import styles from './Welcome.module.css';

export default function Welcome() {
  const navigate = useNavigate();
  const username = getUsername() ?? 'User';

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return (
    <div className={styles.page}>
      {/* Hero section with gradient mesh */}
      <header className={styles.hero}>
        <GradientMesh />
        <div className={styles.heroContent}>
          <nav className={styles.nav}>
            <div className={styles.navLogo}>
              <svg
                width="28"
                height="28"
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
              <span className={styles.navLogoText}>AuthApp</span>
            </div>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={handleLogout}
            >
              Sign out
            </button>
          </nav>

          <div className={styles.heroText}>
            <span className={styles.pill}>Authenticated</span>
            <h1 className={styles.heading}>Welcome back, {username}!</h1>
            <p className={styles.sub}>
              You are successfully logged in. Your session is active and your
              access token is stored securely for this session.
            </p>
          </div>
        </div>
      </header>

      {/* Feature cards section */}
      <main className={styles.main}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardIcon} style={{ color: '#533afd' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className={styles.cardTitle}>Secure Session</h2>
            <p className={styles.cardBody}>
              Your JWT access token is stored in sessionStorage and expires
              after 5 minutes, minimizing exposure.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon} style={{ color: '#ea2261' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 className={styles.cardTitle}>Short-lived Tokens</h2>
            <p className={styles.cardBody}>
              Access tokens are valid for 300 seconds. Use the refresh endpoint
              to obtain a new one without re-authenticating.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon} style={{ color: '#9b6829' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h2 className={styles.cardTitle}>FastAPI Backend</h2>
            <p className={styles.cardBody}>
              Powered by a FastAPI backend with PBKDF2-SHA256 password hashing
              and HS256 JWT signing. Swagger UI available at{' '}
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                /docs
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
