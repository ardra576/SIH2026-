import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Target,
  FileText,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  Zap,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: '5rem 2rem 4rem',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '3.5rem',
        alignItems: 'center'
      }}>
        {/* Left Column: Copy & Actions */}
        <div>
          <div className="badge badge-demo" style={{ marginBottom: '1.25rem', padding: '0.4rem 1rem' }}>
            <Sparkles size={16} color="#A78BFA" />
            <span style={{ fontWeight: 700 }}>Smart India Hackathon 2026 Prototype</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem'
          }}>
            Learn Smarter.{' '}
            <span style={{
              background: 'var(--grad-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Identify Skills.
            </span>{' '}
            Grow Faster.
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: 560
          }}>
            An AI-powered personalized learning and competency intelligence platform that identifies
            skill gaps, recommends targeted learning, generates intelligent quizzes from course materials, and tracks your mastery.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/setup" className="btn-primary" style={{ padding: '0.85rem 1.85rem', fontSize: '1.05rem' }}>
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn-secondary" style={{ padding: '0.85rem 1.6rem', fontSize: '1.05rem' }}>
              Explore Features
            </a>
          </div>

          {/* Quick Metrics Under CTA */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>82%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avg. Mastery Rate</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>100%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contextual MCQs</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>5-Step</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Adaptive Cycle</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Dashboard Mockup */}
        <div style={{ position: 'relative' }}>
          {/* Background Glow */}
          <div style={{
            position: 'absolute',
            inset: -20,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0
          }} />

          <div className="glass-card" style={{
            position: 'relative',
            zIndex: 1,
            padding: '2rem',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            {/* Mock Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>SkillBridge AI Engine</span>
              </div>
              <span className="badge badge-strong" style={{ fontSize: '0.72rem' }}>Live Diagnostic</span>
            </div>

            {/* 4 Illustrative Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {/* Card 1: Competency Score */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMPETENCY SCORE</span>
                  <Award size={16} color="#10B981" />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.3rem 0' }}>
                  82%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <TrendingUp size={12} />
                  <span>+27% Before-vs-Current</span>
                </div>
              </div>

              {/* Card 2: Skill Gap */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRIORITY GAP</span>
                  <Target size={16} color="#EF4444" />
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.3rem 0' }}>
                  Data Analysis
                </div>
                <span className="badge badge-gap" style={{ fontSize: '0.68rem' }}>48% · Needs Focus</span>
              </div>

              {/* Card 3: AI Recommendation */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AI RECOMMENDATION</span>
                  <BrainCircuit size={16} color="#A78BFA" />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.3rem 0' }}>
                  SQL & Data Pipelines
                </div>
                <div style={{ fontSize: '0.72rem', color: '#C4B5FD' }}>4h Target Sprint</div>
              </div>

              {/* Card 4: Quiz Progress */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>QUIZ PROGRESS</span>
                  <Zap size={16} color="#60A5FA" />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.3rem 0' }}>
                  12 / 15
                </div>
                <div style={{ fontSize: '0.72rem', color: '#93C5FD' }}>Mastery Verified</div>
              </div>
            </div>

            {/* Bottom active status badge */}
            <div style={{
              marginTop: '1.25rem',
              padding: '0.75rem 1rem',
              background: 'rgba(139, 92, 246, 0.1)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem'
            }}>
              <span style={{ color: '#E9D5FF' }}>⚡ Instant Topic Extraction: 4 topics ready for quiz generation</span>
              <Link to="/quiz-generator" style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'underline' }}>Launch Quiz</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" style={{
        padding: '5rem 2rem',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3.5rem' }}>
          <span className="badge badge-demo" style={{ marginBottom: '0.75rem' }}>Core Intelligence</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Comprehensive Competency Engine
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Built specifically to solve the Smart India Hackathon problem statement with end-to-end personalization and material synthesis.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Feature 1 */}
          <div className="glass-card card-padding">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <BrainCircuit size={26} color="#A78BFA" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>AI-Powered Assessment</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Generates rigorous, role-aligned diagnostic tests that evaluate depth of conceptual understanding and situational application.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card card-padding">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={26} color="#F87171" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Competency Gap Analysis</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Segments skills into Strong, Moderate, and Gaps with actionable AI insights to focus effort where it yields maximum impact.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card card-padding">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Sparkles size={26} color="#60A5FA" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Personalized Learning</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Prescribes targeted courses, hands-on modules, and micro-skills calculated directly from detected deficiency vectors.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card card-padding">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Zap size={26} color="#34D399" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Smart Quiz Generation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Upload PDFs, PPTXs, or notes; AI extracts core concepts and generates structured MCQs with detailed answer explanations.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="glass-card card-padding">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <TrendingUp size={26} color="#FBBF24" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Progress Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Quantifies Before-vs-Current competency deltas, learning velocity, and awards milestone badges as you achieve mastery.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works: The 5-Step Continuous Workflow */}
      <section id="how-it-works" style={{
        padding: '5rem 2rem',
        background: 'rgba(10, 15, 29, 0.7)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3.5rem' }}>
            <span className="badge badge-strong" style={{ marginBottom: '0.75rem' }}>Core SIH Workflow</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              How SkillBridge AI Works
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              A closed-loop competency enhancement architecture that guarantees measurable skill progression.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {/* Step 1 */}
            <div className="glass-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(139, 92, 246, 0.3)', marginBottom: '0.5rem' }}>
                01
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>PROFILE</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Learner role, experience, qualifications & training history initialize your baseline.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(59, 130, 246, 0.3)', marginBottom: '0.5rem' }}>
                02
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>ASSESS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                AI generates adaptive diagnostic assessments to test core depth across competencies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(239, 68, 68, 0.3)', marginBottom: '0.5rem' }}>
                03
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>ANALYZE</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Identifies competency & skill gaps, highlighting strengths and high-risk deficiency areas.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(16, 185, 129, 0.3)', marginBottom: '0.5rem' }}>
                04
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>PERSONALIZE</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Recommends targeted training, courses, and custom learning materials mapped to gaps.
              </p>
            </div>

            {/* Step 5 */}
            <div className="glass-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(245, 158, 11, 0.3)', marginBottom: '0.5rem' }}>
                05
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>REASSESS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Tracks progress, calculates before-vs-after delta, and updates your verified competency score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Material Processing Pipeline */}
      <section style={{ padding: '5rem 2rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3.5rem' }}>
          <span className="badge badge-demo" style={{ marginBottom: '0.75rem' }}>Material Processing</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            From Document to Intelligent Quiz
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Turn PDFs, lecture slides, and notes into instant self-evaluating question banks.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="glass-card card-padding" style={{ textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <UploadCloud size={28} color="#A78BFA" />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#A78BFA', fontWeight: 700, marginBottom: '0.3rem' }}>STEP 01</div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>Upload Learning Material</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Supports PDFs, PPTX slide decks, markdown, and plain text notes.
            </p>
          </div>

          <div className="glass-card card-padding" style={{ textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <BrainCircuit size={28} color="#60A5FA" />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 700, marginBottom: '0.3rem' }}>STEP 02</div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>AI Processing</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Content understanding and automatic extraction of key topics and concepts.
            </p>
          </div>

          <div className="glass-card card-padding" style={{ textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <HelpCircle size={28} color="#F472B6" />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#F472B6', fontWeight: 700, marginBottom: '0.3rem' }}>STEP 03</div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>MCQ / Quiz Generation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Creates contextual 4-choice questions strictly from the supplied material.
            </p>
          </div>

          <div className="glass-card card-padding" style={{ textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FileCheck size={28} color="#34D399" />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#34D399', fontWeight: 700, marginBottom: '0.3rem' }}>STEP 04</div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>Instant Evaluation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Auto-grades answers with comprehensive rationales and logs competency updates.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{
        padding: '5rem 2rem',
        maxWidth: 1200,
        margin: '0 auto 4rem',
        width: '100%'
      }}>
        <div className="glass-card" style={{
          padding: '3.5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(236, 72, 153, 0.15) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Supercharge Your Learning Velocity?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2rem' }}>
            Initialize your learner profile or explore our SIH 2026 interactive competency prototype now.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/setup" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <span>Create My Profile</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="btn-secondary" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 2rem',
        background: 'var(--bg-card)',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={20} color="#8B5CF6" />
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#FFFFFF' }}>SKILLBRIDGE AI</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>| Smart India Hackathon 2026</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Problem Statement: AI Enabled Learning Platform · Fail-safe Demo Engine
          </div>
        </div>
      </footer>
    </div>
  );
}
