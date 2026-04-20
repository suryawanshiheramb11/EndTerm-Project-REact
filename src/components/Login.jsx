import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Sparkles, LogIn } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <Sparkles className="login-icon" size={40} />
          <h1 className="login-title">UnderstandAnything</h1>
          <p className="login-subtitle">Master any topic with AI-powered study materials</p>
        </div>

        <div className="login-content">
          <p className="login-description">
            Sign in to save your progress, create custom study plans, and unlock personalized learning.
          </p>

          {error && (
            <div className="login-error">
              <p>{error}</p>
            </div>
          )}

          <button
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          <div className="login-divider">
            <span>or continue with email (coming soon)</span>
          </div>

          <div className="login-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Generate study summaries instantly</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Create interactive flashcards</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Practice with AI-generated questions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Track your learning progress</span>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p className="login-privacy">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
