import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, trend, color = 'purple' }) {
  const colorMap = {
    purple: {
      border: 'rgba(139, 92, 246, 0.3)',
      bgIcon: 'rgba(139, 92, 246, 0.15)',
      iconColor: '#A78BFA',
      glow: '0 0 20px rgba(139, 92, 246, 0.2)'
    },
    blue: {
      border: 'rgba(59, 130, 246, 0.3)',
      bgIcon: 'rgba(59, 130, 246, 0.15)',
      iconColor: '#60A5FA',
      glow: '0 0 20px rgba(59, 130, 246, 0.2)'
    },
    emerald: {
      border: 'rgba(16, 185, 129, 0.3)',
      bgIcon: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#34D399',
      glow: '0 0 20px rgba(16, 185, 129, 0.2)'
    },
    amber: {
      border: 'rgba(245, 158, 11, 0.3)',
      bgIcon: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#FBBF24',
      glow: '0 0 20px rgba(245, 158, 11, 0.2)'
    }
  };

  const scheme = colorMap[color] || colorMap.purple;

  return (
    <div
      className="glass-card animate-fade-in"
      style={{
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </div>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.2rem',
          fontWeight: 800,
          color: 'var(--text-main)',
          marginTop: '0.35rem',
          letterSpacing: '-0.02em'
        }}>
          {value}
        </div>
        {subtext && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {trend && (
              <span style={{ color: trend.startsWith('+') ? '#10B981' : '#F59E0B', fontWeight: 600 }}>
                {trend}
              </span>
            )}
            <span>{subtext}</span>
          </div>
        )}
      </div>

      {Icon && (
        <div style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: scheme.bgIcon,
          border: `1px solid ${scheme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: scheme.glow
        }}>
          <Icon size={24} color={scheme.iconColor} />
        </div>
      )}
    </div>
  );
}
