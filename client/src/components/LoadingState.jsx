import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';

export default function LoadingState({
  title = 'AI Engine Processing...',
  messages = [
    'Analyzing contextual concepts...',
    'Synthesizing pedagogical questions...',
    'Calibrating difficulty parameters...',
    'Verifying answer keys & explanations...'
  ]
}) {
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);

  useEffect(() => {
    if (!messages || messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentMsgIdx(prev => (prev + 1) % messages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div
      className="glass-card animate-fade-in"
      style={{
        padding: '3.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: 280
      }}
    >
      {/* Animated Glowing Ring */}
      <div style={{ position: 'relative', width: 70, height: 70, marginBottom: '1.5rem' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid rgba(139, 92, 246, 0.2)',
          borderTopColor: '#8B5CF6',
          borderRightColor: '#EC4899',
          animation: 'spin 1.2s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          inset: 10,
          borderRadius: '50%',
          background: 'var(--grad-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Sparkles size={24} color="#FFFFFF" />
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
        {title}
      </h3>

      <div style={{
        fontSize: '0.95rem',
        color: '#C4B5FD',
        minHeight: 24,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 500
      }}>
        <BrainCircuit size={16} className="animate-glow" />
        <span>{messages[currentMsgIdx]}</span>
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
        Powered by Google Gemini & SkillBridge Competency Intelligence
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
