import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderArchive,
  UploadCloud,
  FileText,
  FileCode,
  Link2,
  BrainCircuit,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { storage } from '../utils/storage';
import { api } from '../services/api';
import { showToast } from '../components/Toast';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

export default function LearningHubPage() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState(storage.getMaterials());
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'notes' | 'url'

  // Upload State
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Text/Notes State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // URL State
  const [urlInput, setUrlInput] = useState('');
  const [urlFallbackNotes, setUrlFallbackNotes] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      showToast('Please select a PDF or PPTX file to upload', 'warning');
      return;
    }

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'pptx', 'ppt', 'txt', 'md'].includes(ext)) {
      showToast(`Unsupported format .${ext}. Please upload PDF, PPTX, or TXT.`, 'error');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.processMaterial(formData);
      if (res && res.success && res.material) {
        const updated = storage.addMaterial(res.material);
        setMaterials(updated);
        setFile(null);
        showToast(`Extracted ${res.material.topics.length} key concepts from ${res.material.name}`, 'success');
      } else {
        showToast(res.error || 'Failed to process document', 'error');
      }
    } catch (err) {
      showToast('File processing failed. Please try a different document.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNotesSubmit = async (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) {
      showToast('Please provide both a title and notes content', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await api.processMaterial({
        title: noteTitle,
        content: noteContent,
        type: 'Lecture Notes'
      });

      if (res && res.success && res.material) {
        const updated = storage.addMaterial(res.material);
        setMaterials(updated);
        setNoteTitle('');
        setNoteContent('');
        showToast('Lecture notes processed and topics extracted!', 'success');
      } else {
        showToast(res.error || 'Failed to process notes', 'error');
      }
    } catch (err) {
      showToast('Notes processing failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      showToast('Please enter a valid learning resource URL', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await api.processMaterial({
        url: urlInput,
        title: `Web Reference: ${urlInput.replace(/^https?:\/\//, '').split('/')[0]}`,
        type: 'Web Article',
        fallbackText: urlFallbackNotes || `Reference material from ${urlInput}`
      });

      if (res && res.success && res.material) {
        const updated = storage.addMaterial(res.material);
        setMaterials(updated);
        setUrlInput('');
        setUrlFallbackNotes('');
        showToast('Web resource registered successfully!', 'success');
      } else {
        showToast(res.error || 'Failed to process URL', 'error');
      }
    } catch (err) {
      showToast('URL processing failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuizForMaterial = (mat) => {
    navigate(`/quiz-generator?materialId=${mat.id}&title=${encodeURIComponent(mat.name)}`);
  };

  const handleDeleteMaterial = (id) => {
    const filtered = materials.filter(m => m.id !== id);
    setMaterials(filtered);
    storage.addMaterial = () => filtered; // sync local
    localStorage.setItem('sb_materials', JSON.stringify(filtered));
    showToast('Learning material removed', 'info');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-demo" style={{ marginBottom: '0.5rem' }}>
          <FolderArchive size={14} color="#A78BFA" />
          <span>Multimodal Material Processing</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Learning Material Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Upload PDFs, lecture PPTs, or paste markdown notes. AI extracts structural concepts and builds instant test sets.
        </p>
      </div>

      {/* Upload / Ingestion Panel */}
      <div className="glass-card card-padding" style={{ marginBottom: '2.5rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('upload')}
            className={activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            <UploadCloud size={16} />
            <span>Upload PDF / PPTX</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={activeTab === 'notes' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            <FileText size={16} />
            <span>Paste Notes / Text</span>
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={activeTab === 'url' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            <Link2 size={16} />
            <span>Add Web Link</span>
          </button>
        </div>

        {loading ? (
          <LoadingState
            title="Processing Learning Material..."
            messages={[
              'Extracting plain text from document slides...',
              'Parsing semantic concepts and structural headings...',
              'Synthesizing core curriculum topics...',
              'Preparing knowledge embeddings for AI Quiz Generator...'
            ]}
          />
        ) : (
          <div>
            {/* Tab 1: File Upload */}
            {activeTab === 'upload' && (
              <form onSubmit={handleFileUpload}>
                <div style={{
                  border: '2px dashed var(--border-bright)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  background: 'rgba(15, 23, 42, 0.4)',
                  cursor: 'pointer',
                  marginBottom: '1.25rem'
                }}>
                  <input
                    type="file"
                    accept=".pdf,.pptx,.ppt,.txt,.md"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="file-upload-input"
                  />
                  <label htmlFor="file-upload-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                      <UploadCloud size={30} color="#A78BFA" />
                    </div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                      {file ? file.name : 'Click to select or drag & drop documents'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Supports PDF, PPTX (PowerPoint), and TXT formats (up to 15MB)
                    </span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={!file} className="btn-primary" style={{ opacity: file ? 1 : 0.5 }}>
                    <Sparkles size={16} />
                    <span>Extract Topics & Process</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Text / Notes */}
            {activeTab === 'notes' && (
              <form onSubmit={handleNotesSubmit}>
                <div className="form-group">
                  <label className="form-label">Material / Lecture Title</label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="e.g. Distributed Consensus & Raft Protocol Notes"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Lecture Notes or Reading Content</label>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Paste lecture notes, study summaries, or chapter excerpts here..."
                    className="form-textarea"
                    rows={6}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary">
                    <Sparkles size={16} />
                    <span>Process Notes & Extract Topics</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tab 3: URL Link */}
            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit}>
                <div className="form-group">
                  <label className="form-label">Resource URL</label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://en.wikipedia.org/wiki/CAP_theorem"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Optional Key Notes / Summary Context</label>
                  <textarea
                    value={urlFallbackNotes}
                    onChange={(e) => setUrlFallbackNotes(e.target.value)}
                    placeholder="Paste relevant excerpts or bullet points from the URL (fallback for paywalled or JS-heavy sites)..."
                    className="form-textarea"
                    rows={3}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary">
                    <Sparkles size={16} />
                    <span>Register Web Reference</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Uploaded Materials List */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Processed Learning Materials</span>
          <span className="badge badge-demo">{materials.length} Active</span>
        </h3>

        {materials.length === 0 ? (
          <EmptyState
            title="No learning materials uploaded yet"
            description="Upload your first lecture slides or notes to start extracting concepts and generating AI quizzes."
            icon={UploadCloud}
            actionLabel="Upload Material Now"
            onAction={() => setActiveTab('upload')}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="glass-card card-padding"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: 'rgba(139, 92, 246, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <FileText size={22} color="#A78BFA" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 700, lineHeight: 1.3 }}>
                          {mat.name}
                        </h4>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                          <span className="badge badge-demo" style={{ fontSize: '0.68rem' }}>{mat.type}</span>
                          {mat.size && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{mat.size}</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteMaterial(mat.id)}
                      style={{ color: 'var(--text-muted)', padding: '0.25rem' }}
                      title="Remove material"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {mat.snippet && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic', lineHeight: 1.4 }}>
                      "{mat.snippet}"
                    </p>
                  )}

                  {/* Extracted Topics */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                      Extracted Concepts:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {mat.topics?.slice(0, 5).map((topic, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '0.25rem 0.55rem',
                            borderRadius: 6,
                            fontSize: '0.75rem',
                            color: '#C4B5FD',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Calendar size={13} />
                    <span>{mat.uploadDate}</span>
                  </div>

                  <button
                    onClick={() => handleGenerateQuizForMaterial(mat)}
                    className="btn-primary"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                  >
                    <BrainCircuit size={15} />
                    <span>Generate Quiz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
