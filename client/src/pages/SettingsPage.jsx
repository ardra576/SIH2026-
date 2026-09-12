import React, { useState } from 'react';
import { Settings, Trash2, Bell, Moon, Sun, Shield, RefreshCw, CheckCircle2 } from 'lucide-react';
import { storage } from '../utils/storage';
import { showToast } from '../components/Toast';

export default function SettingsPage() {
  const [profile, setProfile] = useState(storage.getProfile());
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [lightTheme, setLightTheme] = useState(document.body.classList.contains('light-theme'));

  const handleToggleTheme = () => {
    if (lightTheme) {
      document.body.classList.remove('light-theme');
      setLightTheme(false);
      showToast('Switched to Dark Deep Navy theme', 'info');
    } else {
      document.body.classList.add('light-theme');
      setLightTheme(true);
      showToast('Switched to Light theme', 'info');
    }
  };

  const handleResetDemoData = () => {
    const confirm = window.confirm(
      'Are you sure you want to reset all data? This will restore the original Smart India Hackathon demo baseline.'
    );
    if (!confirm) return;

    const ok = storage.resetAllData();
    if (ok) {
      showToast('All demonstration data has been reset to baseline!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } else {
      showToast('Failed to reset demo data', 'error');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: 850 }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-demo" style={{ marginBottom: '0.5rem' }}>
          <Settings size={14} color="#A78BFA" />
          <span>Platform Settings</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Preferences & System Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Configure environment preferences, theme displays, notifications, and demo resets.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Theme Settings */}
        <div className="glass-card card-padding">
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {lightTheme ? <Sun size={20} color="#F59E0B" /> : <Moon size={20} color="#8B5CF6" />}
            <span>Appearance & Theme</span>
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Display Color Mode</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {lightTheme ? 'Light Slate Mode active' : 'Default Deep Navy SIH Dark Theme active'}
              </div>
            </div>

            <button onClick={handleToggleTheme} className="btn-secondary" style={{ padding: '0.5rem 1.15rem' }}>
              {lightTheme ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass-card card-padding">
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Bell size={20} color="#3B82F6" />
            <span>Notification Preferences</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Reassessment Reminders</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Notify when a competency score is due for bi-weekly verification
                </div>
              </div>
              <input
                type="checkbox"
                checked={quizReminders}
                onChange={(e) => {
                  setQuizReminders(e.target.checked);
                  showToast(`Reassessment reminders ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
                }}
                style={{ width: 18, height: 18, accentColor: '#8B5CF6', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>AI Learning Recommendations Digest</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Receive periodic recommendations for newly detected skill gaps
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => {
                  setEmailAlerts(e.target.checked);
                  showToast(`Recommendations digest ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
                }}
                style={{ width: 18, height: 18, accentColor: '#8B5CF6', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* SIH Reset & Danger Zone */}
        <div className="glass-card card-padding" style={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#F87171' }}>
            <Trash2 size={20} color="#EF4444" />
            <span>SIH Demo Data Reset</span>
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Reset all learner metrics, quiz results, uploaded sample materials, and competency vectors back to
            the default Smart India Hackathon 2026 evaluation dataset.
          </p>

          <button
            onClick={handleResetDemoData}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#F87171',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={16} />
            <span>Clear Demo Data & Reset Application</span>
          </button>
        </div>
      </div>
    </div>
  );
}
