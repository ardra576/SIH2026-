import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PieChart,
  BrainCircuit,
  TrendingUp,
  Target,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { storage } from '../utils/storage';
import { api } from '../services/api';
import SkillMeter from '../components/SkillMeter';

export default function SkillGapsPage() {
  const [competencies, setCompetencies] = useState(storage.getCompetencies());
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    async function loadAnalysis() {
      const comps = storage.getCompetencies();
      setCompetencies(comps);

      setLoadingInsights(true);
      try {
        const res = await api.analyzeSkills(comps);
        if (res && res.success && res.analysis) {
          setInsights(res.analysis.insights);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingInsights(false);
      }
    }
    loadAnalysis();
  }, []);

  const strongSkills = competencies.filter(c => c.score >= 70);
  const moderateSkills = competencies.filter(c => c.score >= 50 && c.score < 70);
  const gapSkills = competencies.filter(c => c.score < 50);

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-demo" style={{ marginBottom: '0.5rem' }}>
          <PieChart size={14} color="#A78BFA" />
          <span>Competency Intelligence</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Skill-Gap Diagnostic Analysis
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Detailed segmentation of competencies into Strong, Moderate, and Gaps with dynamic AI advice.
        </p>
      </div>

      {/* Dynamic AI Insights Hero Card */}
      <div className="glass-card card-padding" style={{
        marginBottom: '2.5rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(139, 92, 246, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BrainCircuit size={20} color="#FFFFFF" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>AI Strategic Diagnostic Insight</h3>
            <span style={{ fontSize: '0.72rem', color: '#A78BFA', fontWeight: 600 }}>SYNTHESIZED FROM LIVE EVALUATION METRICS</span>
          </div>
        </div>

        {loadingInsights ? (
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', padding: '1rem 0' }}>
            Synthesizing personalized competency recommendations...
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {insights?.overview || 'Competency distribution reflects strong foundational technical expertise with specific domain gaps ready for acceleration.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Primary Strengths</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {insights?.strongSummary || `Strongest asset is ${strongSkills[0]?.name || 'Core Skills'}. Solid foundations observed.`}
                </div>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F87171', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <AlertCircle size={16} />
                  <span>Priority Risk Gap</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {insights?.gapSummary || `Primary gap in ${gapSkills[0]?.name || 'Domain Skills'}. Targeted sprints recommended.`}
                </div>
              </div>
            </div>

            {insights?.actionableAdvice && (
              <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#C4B5FD', marginBottom: '0.5rem' }}>
                  Recommended Actionable Roadmap:
                </div>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.83rem', color: 'var(--text-main)' }}>
                  {insights.actionableAdvice.map((advice, i) => (
                    <li key={i}>{advice}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3 Competency Segmentation Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Section 1: Strong Skills */}
        <div className="glass-card card-padding" style={{ borderTop: '3px solid #10B981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} color="#10B981" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>STRONG SKILLS</h3>
            </div>
            <span className="badge badge-strong">{strongSkills.length} Verified</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Proficiency score ≥ 70%. These form your core capabilities.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {strongSkills.map(skill => (
              <SkillMeter
                key={skill.id}
                name={skill.name}
                score={skill.score}
                category={skill.category}
                beforeScore={skill.beforeScore}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Moderate Skills */}
        <div className="glass-card card-padding" style={{ borderTop: '3px solid #F59E0B' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} color="#F59E0B" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>MODERATE SKILLS</h3>
            </div>
            <span className="badge badge-moderate">{moderateSkills.length} Developing</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Proficiency score 50% – 69%. Steady grasp with room for refinement.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {moderateSkills.map(skill => (
              <SkillMeter
                key={skill.id}
                name={skill.name}
                score={skill.score}
                category={skill.category}
                beforeScore={skill.beforeScore}
              />
            ))}
          </div>
        </div>

        {/* Section 3: Skill Gaps */}
        <div className="glass-card card-padding" style={{ borderTop: '3px solid #EF4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} color="#EF4444" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>SKILL GAPS</h3>
            </div>
            <span className="badge badge-gap">{gapSkills.length} Critical</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Proficiency score &lt; 50%. High priority targets for immediate intervention.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {gapSkills.map(skill => (
              <SkillMeter
                key={skill.id}
                name={skill.name}
                score={skill.score}
                category={skill.category}
                beforeScore={skill.beforeScore}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA to Personalize */}
      <div className="glass-card card-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>Bridge Your Competency Gaps</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            SkillBridge AI has generated personalized course recommendations tailored to your detected gaps.
          </p>
        </div>
        <Link to="/recommendations" className="btn-primary">
          <span>Explore Recommended Pathways</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
