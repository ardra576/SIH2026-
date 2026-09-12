import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export default function SkillMeter({ name, score = 0, category, beforeScore, showAction = true }) {
  let status = 'Needs Improvement';
  let badgeClass = 'badge-gap';
  let barGradient = 'linear-gradient(90deg, #EF4444 0%, #F87171 100%)';

  if (score >= 70) {
    status = 'Strong';
    badgeClass = 'badge-strong';
    barGradient = 'linear-gradient(90deg, #10B981 0%, #34D399 100%)';
  } else if (score >= 50) {
    status = 'Moderate';
    badgeClass = 'badge-moderate';
    barGradient = 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)';
  }

  const delta = beforeScore !== undefined ? score - beforeScore : null;

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.5)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
              {name}
            </span>
            <span className={`badge ${badgeClass}`}>{status}</span>
          </div>
          {category && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              {category}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-main)'
          }}>
            {score}%
          </span>
          {delta !== null && (
            <div style={{
              fontSize: '0.72rem',
              color: delta >= 0 ? '#10B981' : '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.2rem'
            }}>
              <TrendingUp size={12} />
              <span>{delta >= 0 ? `+${delta}%` : `${delta}%`}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div style={{
        height: 8,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: `${Math.min(100, Math.max(0, score))}%`,
          height: '100%',
          background: barGradient,
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>

      {showAction && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.85rem' }}>
          <Link
            to={`/assessment?competency=${encodeURIComponent(name)}`}
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#A78BFA',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <span>Take Assessment</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
