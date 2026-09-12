import React from 'react';
import { Link } from 'react-router-dom';
import { Inbox, ArrowRight } from 'lucide-react';

export default function EmptyState({
  title = 'No items found',
  description = 'There are no records to display at this moment.',
  icon: Icon = Inbox,
  actionLabel,
  actionLink,
  onAction
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        marginBottom: '1rem'
      }}>
        <Icon size={26} />
      </div>

      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
        {title}
      </h4>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: 420, marginBottom: '1.5rem' }}>
        {description}
      </p>

      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
          <span>{actionLabel}</span>
          <ArrowRight size={16} />
        </Link>
      )}

      {actionLabel && onAction && !actionLink && (
        <button onClick={onAction} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
          <span>{actionLabel}</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
