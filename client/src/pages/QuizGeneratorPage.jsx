import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  RefreshCw,
  FolderArchive,
  BookOpen,
  HelpCircle,
  Sliders,
  Zap
} from 'lucide-react';
import { storage } from '../utils/storage';
import { api } from '../services/api';
import { showToast } from '../components/Toast';
import LoadingState from '../components/LoadingState';

export default function QuizGeneratorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const materials = storage.getMaterials();
  const preselectedMatId = searchParams.get('materialId') || (materials[0]?.id || '');
  const preselectedTitle = searchParams.get('title') || '';

  // Generator form state
  const [selectedMaterialId, setSelectedMaterialId] = useState(preselectedMatId);
  const [topic, setTopic] = useState(preselectedTitle ? decodeURIComponent(preselectedTitle) : (materials[0]?.topics?.[0] || 'Python Data Structures'));
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);

  // Active quiz state
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [evaluation, setEvaluation] = useState(null);

  // Sync topic when selected material changes
  const handleMaterialChange = (e) => {
    const matId = e.target.value;
    setSelectedMaterialId(matId);
    const found = materials.find(m => m.id === matId);
    if (found && found.topics && found.topics.length > 0) {
      setTopic(found.topics[0]);
    }
  };

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setQuiz(null);
    setEvaluation(null);
    setCurrentIdx(0);
    setUserAnswers({});

    // Find material content if selected
    const foundMat = materials.find(m => m.id === selectedMaterialId);
    const materialText = foundMat ? (foundMat.content || foundMat.snippet || '') : '';

    try {
      const res = await api.generateQuiz({
        materialText,
        topic: topic || foundMat?.name || 'Computer Science Fundamentals',
        difficulty,
        questionCount
      });

      if (res && res.success && res.quiz) {
        setQuiz(res.quiz);
        showToast(`AI Quiz generated: ${res.quiz.questions.length} questions ready!`, 'success');
      } else {
        showToast(res.error || 'Quiz generation failed. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Quiz generation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId, optIdx) => {
    setUserAnswers({ ...userAnswers, [qId]: optIdx });
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;

    // Check unanswered
    const unansweredCount = quiz.questions.filter(q => userAnswers[q.id] === undefined).length;
    if (unansweredCount > 0) {
      const proceed = window.confirm(`You have ${unansweredCount} unanswered questions. Would you like to submit now?`);
      if (!proceed) return;
    }

    setLoading(true);
    try {
      const evalRes = await api.evaluateQuiz({
        questions: quiz.questions,
        userAnswers
      });

      if (evalRes && evalRes.success && evalRes.evaluation) {
        setEvaluation(evalRes.evaluation);

        // Record in quiz history & update stats
        storage.addQuizResult({
          title: quiz.title || `Quiz: ${quiz.topic}`,
          topic: quiz.topic,
          score: evalRes.evaluation.score,
          total: evalRes.evaluation.total,
          percentage: evalRes.evaluation.percentage
        });

        showToast(`Quiz completed! You scored ${evalRes.evaluation.percentage}%`, 'success');
      } else {
        showToast(evalRes.error || 'Quiz evaluation failed', 'error');
      }
    } catch (e) {
      showToast('Quiz evaluation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setUserAnswers({});
    setCurrentIdx(0);
    setEvaluation(null);
  };

  const handleGenerateAnother = () => {
    setQuiz(null);
    setEvaluation(null);
    setUserAnswers({});
    setCurrentIdx(0);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-demo" style={{ marginBottom: '0.5rem' }}>
          <Sparkles size={14} color="#A78BFA" />
          <span>Core AI Quiz Generator</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          AI Quiz Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Generate rigorous, contextual multiple-choice assessments derived directly from your learning materials.
        </p>
      </div>

      {loading && (
        <LoadingState
          title="Synthesizing Contextual AI Quiz..."
          messages={[
            'Reading contextual concepts from learning material...',
            'Formulating distractor options and verified answers...',
            'Validating JSON schema and explanation integrity...',
            'Finalizing assessment session...'
          ]}
        />
      )}

      {/* Quiz Generation Configuration Form */}
      {!loading && !quiz && !evaluation && (
        <div className="glass-card card-padding" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BrainCircuit size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Configure New Quiz</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Target specific topics or upload lecture materials to seed questions
              </p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Select Learning Material Source</label>
            <select
              value={selectedMaterialId}
              onChange={handleMaterialChange}
              className="form-select"
            >
              <option value="">Custom Topic (No specific file)</option>
              {materials.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.type})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Subject / Topic Focus</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Python Generators & Memory, CAP Theorem, etc."
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="form-select"
              >
                <option value="Easy">Easy (Conceptual Recall)</option>
                <option value="Medium">Medium (Applied Analysis)</option>
                <option value="Hard">Hard (Deep Technical Edge Cases)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Number of Questions</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="form-select"
              >
                <option value={3}>3 Questions (Micro-Quiz)</option>
                <option value={5}>5 Questions (Recommended)</option>
                <option value={8}>8 Questions (Comprehensive)</option>
                <option value={10}>10 Questions (Full Assessment)</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={handleGenerateQuiz}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <Sparkles size={18} />
              <span>Generate AI Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Step-by-Step Quiz Interface */}
      {!loading && quiz && !evaluation && (
        <div className="glass-card card-padding" style={{ maxWidth: 850, margin: '0 auto' }}>
          {/* Quiz Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF' }}>{quiz.title}</h2>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <span className="badge badge-demo">{quiz.topic}</span>
                <span className="badge badge-moderate">{difficulty}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: '#A78BFA', fontWeight: 700 }}>
                Question {currentIdx + 1} of {quiz.questions.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {Object.keys(userAnswers).length} answered
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ height: 6, width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 99, marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{
              width: `${((currentIdx + 1) / quiz.questions.length) * 100}%`,
              height: '100%',
              background: 'var(--grad-primary)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Current Question */}
          {(() => {
            const currentQ = quiz.questions[currentIdx];
            const selectedOpt = userAnswers[currentQ.id];

            return (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.45, marginBottom: '1.75rem', color: 'var(--text-main)' }}>
                  {currentQ.question}
                </h3>

                {/* 4 Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
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
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          border: isSelected ? '2px solid #8B5CF6' : '1.5px solid var(--text-muted)',
                          background: isSelected ? '#8B5CF6' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.85rem',
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

                {/* Navigation Footer */}
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

                  {currentIdx < quiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIdx(prev => prev + 1)}
                      className="btn-primary"
                    >
                      <span>Next Question</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="btn-primary"
                      style={{ background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)' }}
                    >
                      <CheckCircle2 size={18} />
                      <span>Submit Quiz</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Quiz Evaluation Results Scorecard */}
      {!loading && evaluation && (
        <div className="glass-card card-padding animate-fade-in" style={{ maxWidth: 850, margin: '0 auto' }}>
          {/* Top Score Banner */}
          <div style={{ textAlign: 'center', paddingBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: evaluation.percentage >= 70 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              border: `2px solid ${evaluation.percentage >= 70 ? '#10B981' : '#F59E0B'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Award size={42} color={evaluation.percentage >= 70 ? '#10B981' : '#F59E0B'} />
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              YOUR QUIZ SCORE
            </div>

            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3.6rem', fontWeight: 900, color: '#FFFFFF', margin: '0.2rem 0' }}>
              {evaluation.score} / {evaluation.total}
            </div>

            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: evaluation.percentage >= 70 ? '#34D399' : '#FBBF24', marginBottom: '0.5rem' }}>
              {evaluation.percentage}% · {evaluation.performanceLabel}
            </div>

            <div style={{ display: 'inline-flex', gap: '1rem', marginTop: '0.5rem' }}>
              <span className="badge badge-strong">
                <CheckCircle2 size={14} />
                <span>{evaluation.score} Correct</span>
              </span>
              <span className="badge badge-gap">
                <XCircle size={14} />
                <span>{evaluation.total - evaluation.score} Wrong</span>
              </span>
            </div>
          </div>

          {/* Answer Explanations Review */}
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={18} color="#A78BFA" />
            <span>Question Review & Detailed Explanations</span>
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
                    <span style={{ color: 'var(--text-muted)' }}>Selected: </span>
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

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleTryAgain} className="btn-secondary">
              <RefreshCw size={16} />
              <span>Try Again</span>
            </button>
            <button onClick={handleGenerateAnother} className="btn-primary">
              <Sparkles size={16} />
              <span>Generate Another Quiz</span>
            </button>
            <Link to="/learning-hub" className="btn-secondary">
              <FolderArchive size={16} />
              <span>Back to Learning Hub</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
