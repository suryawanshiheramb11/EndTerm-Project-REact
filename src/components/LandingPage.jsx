import React, { useState } from 'react';
import { Sparkles, BookOpen, BrainCircuit, Layers, Zap, ArrowRight, Atom, Star, Globe } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // User will be automatically redirected by App.jsx
        } catch (err) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError(err.message || 'Failed to sign in with Google');
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="landing-container">
            <div className="landing-bg-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <nav className="landing-nav">
                <div className="brand">
                    <Sparkles className="brand-icon" size={28} />
                    <span className="gradient-text">UnderstandAnything</span>
                </div>
                <button className="nav-cta" onClick={handleGoogleSignIn} disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={16} />
                </button>
            </nav>

            <section className="hero-section">
                <div className="hero-badge glass-panel">
                    <Zap size={14} />
                    <span>Powered by Google Gemini AI</span>
                </div>
                <h1 className="hero-title">
                    Learn Anything.<br />
                    <span className="gradient-text">Instantly.</span>
                </h1>
                <p className="hero-subtitle">
                    Enter any topic and get AI-generated study summaries, practice tests,
                    and interactive flashcards — all in seconds.
                </p>
                {error && (
                    <div className="error-banner">
                        <p>{error}</p>
                    </div>
                )}
                <div className="hero-actions">
                    <button 
                        className="hero-btn primary google-signin" 
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <svg className="google-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Sign in with Google — It's Free
                            </>
                        )}
                    </button>
                    <a href="#features" className="hero-btn secondary">
                        See How It Works
                    </a>
                </div>
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-value gradient-text">∞</span>
                        <span className="stat-label">Topics</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value gradient-text">3</span>
                        <span className="stat-label">Study Modes</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value gradient-text">&lt;15s</span>
                        <span className="stat-label">Generation</span>
                    </div>
                </div>
            </section>

            <section className="features-section" id="features">
                <h2 className="section-title">
                    Three Powerful <span className="gradient-text">Study Modes</span>
                </h2>
                <p className="section-subtitle">
                    Every topic is transformed into a complete learning experience.
                </p>

                <div className="features-grid">
                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper glow-cyan-bg">
                            <BookOpen size={28} />
                        </div>
                        <h3>Topic Summary</h3>
                        <p>
                            Comprehensive breakdowns with core theories, key sections,
                            and actionable takeaways — structured for deep understanding.
                        </p>
                        <div className="feature-tag">AI-Written</div>
                    </div>

                    <div className="feature-card glass-panel featured">
                        <div className="featured-badge">Most Popular</div>
                        <div className="feature-icon-wrapper glow-violet-bg">
                            <BrainCircuit size={28} />
                        </div>
                        <h3>Practice Tests</h3>
                        <p>
                            Multiple-choice and short-answer questions with instant
                            feedback and detailed explanations for every answer.
                        </p>
                        <div className="feature-tag">Interactive</div>
                    </div>

                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper glow-blue-bg">
                            <Layers size={28} />
                        </div>
                        <h3>Flashcards</h3>
                        <p>
                            Beautiful 3D-flip flashcards for active recall training.
                            Navigate through key terms and definitions easily.
                        </p>
                        <div className="feature-tag">3D Animated</div>
                    </div>
                </div>
            </section>

            <section className="how-section">
                <h2 className="section-title">
                    How It <span className="gradient-text">Works</span>
                </h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <h3>Enter a Topic</h3>
                        <p>Type any subject — from Quantum Physics to World History.</p>
                    </div>
                    <div className="step-connector">
                        <ArrowRight size={24} />
                    </div>
                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>AI Generates</h3>
                        <p>Gemini AI creates structured study materials in seconds.</p>
                    </div>
                    <div className="step-connector">
                        <ArrowRight size={24} />
                    </div>
                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Start Learning</h3>
                        <p>Browse summaries, take tests, and flip through flashcards.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-card glass-panel">
                    <Sparkles size={40} className="cta-icon" />
                    <h2>Ready to Supercharge Your Studying?</h2>
                    <p>
                        Join thousands of students who are already learning faster
                        with AI-powered study materials.
                    </p>
                    <button 
                        className="hero-btn primary google-signin" 
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <svg className="google-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Start Learning Now
                            </>
                        )}
                    </button>
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-brand">
                    <Sparkles size={20} />
                    <span className="gradient-text">UnderstandAnything</span>
                </div>
                <p>AI-Powered Study Material Generator</p>
                <p className="footer-copy">© 2026 UnderstandAnything. Built with React & Gemini AI.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
