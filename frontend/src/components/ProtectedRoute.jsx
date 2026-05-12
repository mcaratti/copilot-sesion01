import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

/**
 * Renders children only when the user is authenticated.
 * Redirects to the login page otherwise.
 */
export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}
