import React, { useState } from 'react';
import { Sparkles, BookOpen, PenTool, LayoutTemplate, LogOut, ChevronDown, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    window.location.reload(); // Refresh to show landing page
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <button 
          className="home-btn"
          onClick={() => window.location.reload()}
          title="Back to Home"
        >
          <Sparkles className="brand-icon" size={28} />
        </button>
        <span className="gradient-text">UnderstandAnything</span>
      </div>
      <div className="nav-links">
        <button
          className={`nav-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <BookOpen size={16} className="inline-icon" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Topic Summary
        </button>
        <button
          className={`nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <PenTool size={16} className="inline-icon" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Practice Test
        </button>
        <button
          className={`nav-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          <LayoutTemplate size={16} className="inline-icon" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Flashcards
        </button>
      </div>
      
      {user && (
        <div className="user-section">
          <div className="user-menu-wrapper">
            <button 
              className="user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="user-avatar"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="user-avatar-placeholder">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <span className="user-name">{user.displayName || 'User'}</span>
              <ChevronDown size={16} />
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <p className="user-email">{user.email}</p>
                </div>
                <button 
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
