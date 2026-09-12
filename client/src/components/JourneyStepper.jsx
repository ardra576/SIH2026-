import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, ClipboardCheck, PieChart, Compass, RefreshCw, CheckCircle } from 'lucide-react';

const STAGES = [
  { id: 'PROFILE', label: '01 Profile', desc: 'Background & Goals', link: '/profile', icon: UserCheck },
  { id: 'ASSESS', label: '02 Assess', desc: 'AI Evaluation', link: '/assessment', icon: ClipboardCheck },
  { id: 'ANALYZE', label: '03 Analyze', desc: 'Competency Gaps', link: '/skill-gaps', icon: PieChart },
  { id: 'PERSONALIZE', label: '04 Personalize', desc: 'Targeted Pathways', link: '/recommendations', icon: Compass },
  { id: 'REASSESS', label: '05 Reassess', desc: 'Competency Velocity', link: '/progress', icon: RefreshCw }
];

export default function JourneyStepper({ currentStage = 'ANALYZE' }) {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage.toUpperCase());
  const activeIdx = currentIndex >= 0 ? currentIndex : 2;

  return (
    <div className="glass-card card-padding" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Continuous Competency Cycle</span>
            <span className="badge badge-strong" style={{ fontSize: '0.72rem' }}>Active Engine</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            The SIH 2026 adaptive loop continuously evaluates your skills and prescribes targeted learning.
          </p>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#A78BFA', fontWeight: 600 }}>
          Current Phase: {STAGES[activeIdx]?.label}
        </div>
      </div>

      {/* Connected Steps Bar */}
      <div className="journey-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        position: 'relative'
      }}>
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrent = idx === activeIdx;
          const isPassed = idx < activeIdx;

          return (
            <Link
              key={stage.id}
              to={stage.link}
              style={{
                background: isCurrent
                  ? 'linear-gradient(145deg, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.15) 100%)'
                  : 'rgba(15, 23, 42, 0.6)',
                border: isCurrent
                  ? '1.5px solid #8B5CF6'
                  : (isPassed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)'),
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                boxShadow: isCurrent ? '0 0 25px rgba(139, 92, 246, 0.3)' : 'none',
                transform: isCurrent ? 'translateY(-2px)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: isCurrent
                  ? 'var(--grad-primary)'
                  : (isPassed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isPassed ? '#34D399' : (isCurrent ? '#FFFFFF' : 'var(--text-muted)'),
                flexShrink: 0
              }}>
                {isPassed ? <CheckCircle size={20} /> : <Icon size={20} />}
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: isCurrent ? '#FFFFFF' : (isPassed ? '#34D399' : 'var(--text-secondary)')
                }}>
                  {stage.label}
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  color: isCurrent ? '#E9D5FF' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {stage.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
