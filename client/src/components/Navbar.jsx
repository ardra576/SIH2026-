import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Compass, CheckCircle2, LayoutDashboard, Menu, X, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [geminiActive, setGeminiActive] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const res = await api.checkHealth();
      if (res && res.geminiConfigured) {
        setGeminiActive(true);
      }
    }
    checkStatus();
  }, []);

  const isLanding = location.pathname === '/';

  return (
    <header className="navbar-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Sparkles size={22} color="#FFFFFF" />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 800,
              background: 'linear-gradient(to right, #FFFFFF, #C4B5FD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              SKILLBRIDGE AI
            </span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: -2, fontWeight: 500 }}>
              Smart India Hackathon 2026
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', mdDisplay: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <Link to="/" style={{
            color: isLanding ? '#A78BFA' : 'var(--text-secondary)',
            fontWeight: 500,
            transition: 'color 0.2s',
            fontSize: '0.95rem'
          }}>
            Home
          </Link>
          <a href="/#features" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.95rem' }}>
            Features
          </a>
          <a href="/#how-it-works" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.95rem' }}>
            How It Works
          </a>
          <Link to="/dashboard" style={{
            color: location.pathname.startsWith('/dashboard') ? '#A78BFA' : 'var(--text-secondary)',
            fontWeight: 500,
            fontSize: '0.95rem'
          }}>
            Dashboard
          </Link>
        </nav>

        {/* Right CTA & Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Demo / Live AI Badge */}
          <div className={`badge ${geminiActive ? 'badge-strong' : 'badge-demo'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: geminiActive ? '#10B981' : '#8B5CF6',
              boxShadow: geminiActive ? '0 0 8px #10B981' : '0 0 8px #8B5CF6'
            }} />
            <span>{geminiActive ? 'Gemini Live AI' : 'Demo Mode Active'}</span>
          </div>

          <Link to={isLanding ? "/setup" : "/dashboard"} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}>
            {isLanding ? 'Get Started' : 'My Dashboard'}
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'inline-flex', color: 'var(--text-main)', padding: '0.4rem' }}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>Home</Link>
          <a href="/#features" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', padding: '0.5rem 0' }}>Features</a>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', padding: '0.5rem 0' }}>How It Works</a>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>Dashboard</Link>
          <Link to="/setup" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ marginTop: '0.5rem' }}>Create Profile</Link>
        </div>
      )}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
