import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ClipboardCheck,
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  RefreshCw,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { storage } from '../utils/storage';
import { showToast } from '../components/Toast';
import LoadingState from '../components/LoadingState';

export default function AssessmentPage() {
  const [searchParams] = useSearchParams();
  const initialComp = searchParams.get('competency') || 'Python';

  const [competency, setCompetency] = useState(initialComp);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);

  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [evaluation, setEvaluation] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setAssessment(null);
    setEvaluation(null);
    setCurrentIdx(0);
    setUserAnswers({});

    try {
      const res = await api.generateAssessment({
        competency,
        difficulty,
        questionCount
      });

      if (res && res.success && res.assessment) {
        setAssessment(res.assessment);
        showToast(`Assessment ready: ${res.assessment.questions.length} questions loaded`, 'success');
      } else {
        showToast(res.error || 'Failed to generate assessment. Please try again.', 'error');
      }
    } catch (e) {
      showToast('Assessment generation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    setUserAnswers({ ...userAnswers, [qId]: optionIdx });
  };

  const handleSubmit = async () => {
    if (!assessment) return;

    // Check unanswered questions
    const unanswered = assessment.questions.filter(q => userAnswers[q.id] === undefined);
    if (unanswered.length > 0) {
      const confirm = window.confirm(`You have ${unanswered.length} unanswered questions. Submit anyway?`);
      if (!confirm) return;
    }

    setLoading(true);
    try {
      const evalRes = await api.evaluateQuiz({
        questions: assessment.questions,
        userAnswers
      });

      if (evalRes && evalRes.success && evalRes.evaluation) {
        setEvaluation(evalRes.evaluation);

        // Update competency score in localStorage!
        const newScore = evalRes.evaluation.percentage;
        storage.updateCompetency(competency, newScore);

        // Record in quiz/assessment history
        storage.addQuizResult({
          title: `Competency Assessment: ${competency}`,
          topic: competency,
          score: evalRes.evaluation.score,
          total: evalRes.evaluation.total,
          percentage: evalRes.evaluation.percentage
        });

        showToast(`Competency updated: ${competency} is now ${newScore}%!`, 'success');
      } else {
        showToast(evalRes.error || 'Evaluation failed', 'error');
      }
    } catch (e) {
      showToast('Evaluation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-demo" style={{ marginBottom: '0.5rem' }}>
          <BrainCircuit size={14} color="#A78BFA" />
          <span>Continuous Assessment Engine</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          AI Competency Assessment
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Test your domain depth with scenario-driven evaluations. Your verified score directly recalibrates your competency index.
        </p>
      </div>

      {loading && (
        <LoadingState
          title="Generating AI Competency Assessment..."
          messages={[
            `Calibrating questions for ${competency}...`,
            'Constructing diagnostic multiple-choice questions...',
            'Validating pedagogical difficulty level...',
            'Finalizing assessment structure...'
          ]}
        />
      )}

      {/* Setup Form (when not active) */}
      {!loading && !assessment && !evaluation && (
        <div className="glass-card card-padding" style={{ maxWidth: 700, margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClipboardCheck size={22} color="#8B5CF6" />
            <span>Configure Assessment Parameters</span>
          </h3>

          <div className="form-group">
            <label className="form-label">Select Competency Domain</label>
            <select
              value={competency}
              onChange={(e) => setCompetency(e.target.value)}
              className="form-select"
            >
              <option value="Python">Python Programming</option>
              <option value="Problem Solving">Algorithmic Problem Solving</option>
              <option value="Communication">Executive & Technical Communication</option>
              <option value="Leadership">Engineering Leadership & Strategy</option>
              <option value="Data Analysis">Data Analysis & SQL Fundamentals</option>
              <option value="Cloud Architecture">Cloud Architecture & Microservices</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="form-select"
              >
                <option value="Beginner">Beginner (Foundational)</option>
                <option value="Medium">Medium (Applied Problem Solving)</option>
                <option value="Hard">Hard (Senior Diagnostic)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Number of Questions</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="form-select"
              >
                <option value={3}>3 Quick Diagnostic Questions</option>
                <option value={5}>5 Comprehensive Questions (Recommended)</option>
                <option value={8}>8 In-Depth Questions</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={handleGenerate}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <Sparkles size={18} />
              <span>Generate Assessment</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Question Stepper UI */}
      {!loading && assessment && !evaluation && (
        <div className="glass-card card-padding" style={{ maxWidth: 850, margin: '0 auto' }}>
          {/* Progress and Stepper Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <span className="badge badge-demo">{assessment.competency}</span>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Question {currentIdx + 1} of {assessment.questions.length}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: '#A78BFA', fontWeight: 600 }}>
                {Math.round(((currentIdx + 1) / assessment.questions.length) * 100)}% Complete
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ height: 6, width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 99, marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{
              width: `${((currentIdx + 1) / assessment.questions.length) * 100}%`,
              height: '100%',
              background: 'var(--grad-primary)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Current Question */}
          {(() => {
            const currentQ = assessment.questions[currentIdx];
            const selectedOpt = userAnswers[currentQ.id];

            return (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '1.75rem', color: 'var(--text-main)' }}>
                  {currentQ.question}
                </h3>

                {/* 4 Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectAnswer(currentQ.id, optIdx)}
                        style={{
                          background: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                          border: isSelected ? '1.5px solid #8B5CF6' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem 1.25rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 15px rgba(139, 92, 246, 0.25)' : 'none'
                        }}
                      >
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          border: isSelected ? '2px solid #8B5CF6' : '1.5px solid var(--text-muted)',
                          background: isSelected ? '#8B5CF6' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          flexShrink: 0
                        }}>
                          {['A', 'B', 'C', 'D'][optIdx]}
                        </div>
                        <span style={{ fontSize: '0.95rem', color: isSelected ? '#FFFFFF' : 'var(--text-main)' }}>
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                  <button
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx(prev => prev - 1)}
                    className="btn-secondary"
                    style={{ opacity: currentIdx === 0 ? 0.4 : 1 }}
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>

                  {currentIdx < assessment.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIdx(prev => prev + 1)}
                      className="btn-primary"
                    >
                      <span>Next Question</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="btn-primary"
                      style={{ background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)' }}
                    >
                      <CheckCircle2 size={18} />
                      <span>Submit Assessment</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Evaluation Results Card */}
      {!loading && evaluation && (
        <div className="glass-card card-padding animate-fade-in" style={{ maxWidth: 850, margin: '0 auto' }}>
          {/* Result Score Header */}
          <div style={{ textAlign: 'center', paddingBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
            <div style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              background: evaluation.percentage >= 70 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              border: `2px solid ${evaluation.percentage >= 70 ? '#10B981' : '#F59E0B'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Award size={38} color={evaluation.percentage >= 70 ? '#10B981' : '#F59E0B'} />
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ASSESSMENT RESULTS
            </div>

            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', fontWeight: 900, color: '#FFFFFF', margin: '0.2rem 0' }}>
              {evaluation.percentage}%
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: evaluation.percentage >= 70 ? '#34D399' : '#FBBF24' }}>
              {evaluation.score} of {evaluation.total} Questions Correct · {evaluation.performanceLabel}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Your verified score has been applied to your learner profile competency matrix.
            </p>
          </div>

          {/* Detailed Question Review with Explanations */}
          <h4 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={18} color="#A78BFA" />
            <span>Answer Explanations & Rationale</span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {evaluation.details.map((q, idx) => (
              <div
                key={q.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: q.isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF' }}>
                    {idx + 1}. {q.question}
                  </span>
                  {q.isCorrect ? (
                    <span className="badge badge-strong" style={{ flexShrink: 0 }}>
                      <CheckCircle2 size={14} />
                      <span>Correct</span>
                    </span>
                  ) : (
                    <span className="badge badge-gap" style={{ flexShrink: 0 }}>
                      <XCircle size={14} />
                      <span>Incorrect</span>
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Your Answer: </span>
                    <span style={{ color: q.isCorrect ? '#34D399' : '#F87171', fontWeight: 600 }}>
                      {q.userAnswerText}
                    </span>
                  </div>
                  {!q.isCorrect && (
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Correct Answer: </span>
                      <span style={{ color: '#34D399', fontWeight: 600 }}>
                        {q.correctAnswerText}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderLeft: '3px solid #8B5CF6',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 4,
                  fontSize: '0.82rem',
                  color: '#E9D5FF'
                }}>
                  <strong>AI Explanation: </strong>{q.explanation}
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setEvaluation(null);
                setAssessment(null);
              }}
              className="btn-secondary"
            >
              <RefreshCw size={16} />
              <span>Take Another Assessment</span>
            </button>
            <Link to="/skill-gaps" className="btn-primary">
              <span>View Updated Skill Gaps</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
