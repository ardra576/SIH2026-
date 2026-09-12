import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, BookOpen, Clock, Target, ArrowRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { storage } from '../utils/storage';
import { api } from '../services/api';
import { showToast } from '../components/Toast';

export default function RecommendationsPage() {
  const [competencies, setCompetencies] = useState(storage.getCompetencies());
  const [recommendations, setRecommendations] = useState([]);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    async function loadRecs() {
      const comps = storage.getCompetencies();
      setCompetencies(comps);
      const gaps = comps.filter(c => c.score < 60);

      const res = await api.getRecommendations(gaps);
      if (res && res.recommendations) {
        setRecommendations(res.recommendations);
      }
    }
    loadRecs();
  }, []);

  const handleStartModule = (rec) => {
    setActiveModule(rec);
  };

  const handleCompleteModule = (rec) => {
    const list = storage.getCompetencies();
    const match = list.find(c => c.name.toLowerCase().includes(rec.skill.toLowerCase()) || rec.skill.toLowerCase().includes(c.name.toLowerCase()));

    if (match) {
      const updatedScore = Math.min(100, match.score + 12);
      storage.updateCompetency(match.id, updatedScore);
      setCompetencies(storage.getCompetencies());
      showToast(`Achievement unlocked! ${match.name} elevated to ${updatedScore}%`, 'success');
    } else {
      showToast('Learning pathway completed!', 'success');
    }
    setActiveModule(null);
  };

  const detectedGaps = competencies.filter(c => c.score < 60);

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-demo" style={{ marginBottom: '0.5rem' }}>
          <Compass size={14} color="#A78BFA" />
          <span>Intelligent Curriculum Prescription</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Personalized Learning Recommendations
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Curated training programs algorithmically linked to your detected skill gaps and career objectives.
        </p>
      </div>

      {/* Target Gaps Alert Bar */}
      <div className="glass-card card-padding" style={{ marginBottom: '2.5rem', background: 'rgba(15, 23, 42, 0.7)', borderLeft: '4px solid #8B5CF6' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>
              Priority Remediation Focus Areas
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Identified from your diagnostic assessments across {competencies.length} competency dimensions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {detectedGaps.map(g => (
              <span key={g.id} className="badge badge-gap" style={{ fontSize: '0.8rem' }}>
                {g.name}: {g.score}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="glass-card card-padding"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <span className="badge badge-demo">{rec.skill}</span>
                <span className="badge badge-moderate">{rec.difficulty}</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                {rec.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {rec.description}
              </p>

              <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.75rem', borderRadius: 8, marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C4B5FD', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Why This Course?
                </div>
                <div style={{ fontSize: '0.8rem', color: '#E9D5FF' }}>
                  {rec.reason}
                </div>
              </div>

              {rec.topics && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Syllabus Focus:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {rec.topics.map((t, idx) => (
                      <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Clock size={14} />
                <span>{rec.estimatedTime}</span>
              </div>

              <button
                onClick={() => handleStartModule(rec)}
                className="btn-primary"
                style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
              >
                <span>Launch Pathway</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Interactive Learning Pathway Modal */}
      {activeModule && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-card card-padding" style={{ maxWidth: 620, width: '100%', background: '#0F172A', border: '1.5px solid #8B5CF6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div className="badge badge-strong">Interactive Learning Sandbox</div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏱ {activeModule.estimatedTime}</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {activeModule.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {activeModule.description}
            </p>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.25rem', borderRadius: 8, marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#C4B5FD', marginBottom: '0.75rem' }}>
                Curriculum Blueprint & Micro-Lessons:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeModule.topics?.map((top, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA', fontSize: '0.75rem', fontWeight: 700 }}>
                      {i + 1}
                    </div>
                    <span>{top}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setActiveModule(null)} className="btn-secondary">
                Close
              </button>
              <button onClick={() => handleCompleteModule(activeModule)} className="btn-primary">
                <CheckCircle2 size={16} />
                <span>Simulate Completion (+12% Velocity)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
