import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Zap,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { storage } from '../utils/storage';

export default function ProgressPage() {
  const [competencies] = useState(storage.getCompetencies());
  const [stats] = useState(storage.getStats());
  const [history] = useState(storage.getQuizHistory());
  const [achievements] = useState(storage.getAchievements());

  const getBadgeIcon = (id) => {
    switch (id) {
      case 'ach-1':
        return <Award size={22} color="#10B981" />;
      case 'ach-2':
        return <Zap size={22} color="#8B5CF6" />;
      case 'ach-3':
        return <Clock size={22} color="#3B82F6" />;
      default:
        return <TrendingUp size={22} color="#F59E0B" />;
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-demo" style={{ marginBottom: '0.5rem' }}>
          <TrendingUp size={14} color="#A78BFA" />
          <span>Longitudinal Intelligence</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Competency Progress & Velocity
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Quantifiable Before-vs-Current growth metrics, quiz evaluation logs, and unlocked milestones.
        </p>
      </div>

      {/* Before vs Current Comparative Analysis Table/Cards */}
      <div className="glass-card card-padding" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Before vs Current Competency Analysis</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Evaluating improvement delta against your diagnostic baseline evaluation
            </p>
          </div>
          <span className="badge badge-strong">Continuous Reassessment Active</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {competencies.map((comp) => {
            const before = comp.beforeScore || 50;
            const current = comp.score;
            const delta = current - before;
            const isPositive = delta >= 0;

            return (
              <div
                key={comp.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF' }}>{comp.name}</span>
                  <span
                    className={`badge ${isPositive ? 'badge-strong' : 'badge-gap'}`}
                    style={{ fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    {isPositive ? `+${delta}%` : `${delta}%`} Improvement
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Baseline: </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{before}%</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Verified Current: </span>
                    <span style={{ fontWeight: 700, color: '#A78BFA', fontSize: '1.1rem' }}>{current}%</span>
                  </div>
                </div>

                {/* Comparative Double Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {/* Baseline bar */}
                  <div style={{ height: 6, width: '100%', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: `${before}%`, height: '100%', background: '#64748B' }} />
                  </div>
                  {/* Current bar */}
                  <div style={{ height: 8, width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{
                      width: `${current}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #8B5CF6 0%, #10B981 100%)'
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="glass-card card-padding" style={{ marginBottom: '2.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Competency Mastery Badges</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Milestones unlocked as you complete assessments and eliminate skill deficiencies
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {achievements.map((ach) => (
            <div
              key={ach.id}
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: ach.unlocked ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                opacity: ach.unlocked ? 1 : 0.4
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: ach.unlocked ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {getBadgeIcon(ach.id)}
              </div>

              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {ach.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {ach.description}
                </div>
                {ach.unlocked && (
                  <div style={{ fontSize: '0.7rem', color: '#10B981', marginTop: '0.35rem', fontWeight: 600 }}>
                    ✓ Unlocked {ach.unlockedAt}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz History Log */}
      <div className="glass-card card-padding">
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Assessment & Quiz Evaluation History</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Complete audit trail of all AI-evaluated test sessions
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {history.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF' }}>
                  {item.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{item.topic}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: item.percentage >= 70 ? '#34D399' : '#FBBF24' }}>
                    {item.score} / {item.total}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {item.percentage}% Score
                  </div>
                </div>

                <span className={`badge ${item.percentage >= 70 ? 'badge-strong' : 'badge-moderate'}`}>
                  {item.percentage >= 70 ? 'Passed' : 'Review'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
