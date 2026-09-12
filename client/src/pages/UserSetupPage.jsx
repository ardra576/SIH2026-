import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { storage } from '../utils/storage';
import { showToast } from '../components/Toast';
import Navbar from '../components/Navbar';

export default function UserSetupPage() {
  const navigate = useNavigate();
  const existing = storage.getProfile();

  const [formData, setFormData] = useState({
    name: existing.name || 'Aarav Sharma',
    email: existing.email || 'aarav.sharma@sih.edu.in',
    role: existing.role || 'Full-Stack & AI Engineering Aspirant',
    experience: existing.experience || '2+ Years (Academic & Capstone)',
    qualification: existing.qualification || 'B.Tech in Computer Science & Engineering',
    specialization: existing.specialization || 'Artificial Intelligence & Cloud Architecture'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter your full name', 'warning');
      return;
    }

    const updatedProfile = {
      ...existing,
      ...formData,
      currentJourneyStage: existing.currentJourneyStage || 'PROFILE'
    };

    storage.saveProfile(updatedProfile);
    showToast('Learning profile initialized successfully!', 'success');
    navigate('/dashboard');
  };

  const loadDemoPreset = () => {
    setFormData({
      name: 'Aarav Sharma',
      email: 'aarav.sharma@sih.edu.in',
      role: 'Full-Stack & AI Engineering Aspirant',
      experience: '2+ Years (Academic & Capstone)',
      qualification: 'B.Tech in Computer Science & Engineering',
      specialization: 'Artificial Intelligence & Distributed Systems'
    });
    showToast('Demo SIH student profile filled', 'info');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div className="page-container" style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem'
      }}>
        <div className="glass-card card-padding" style={{
          maxWidth: 620,
          width: '100%',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'var(--grad-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <UserCheck size={26} color="#FFFFFF" />
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
              Create Your Learning Profile
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              SkillBridge AI customizes competency benchmarks and learning recommendations to your background.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. aarav@sih.edu.in"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Target Role / Track</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. AI Systems Engineer"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Student / Beginner">Student / Beginner</option>
                  <option value="1-2 Years (Junior / Intern)">1-2 Years (Junior / Intern)</option>
                  <option value="2+ Years (Academic & Capstone)">2+ Years (Academic & Capstone)</option>
                  <option value="3-5 Years (Mid-level)">3-5 Years (Mid-level)</option>
                  <option value="5+ Years (Senior Track)">5+ Years (Senior Track)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Qualification / Degree</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech Computer Science"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Specialization / Focus Area</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Artificial Intelligence & Cloud"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Fill & Submit Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                <span>Create My Learning Profile</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={loadDemoPreset}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem', padding: '0.65rem' }}
              >
                <Sparkles size={16} color="#A78BFA" />
                <span>Fill Realistic SIH Demo Preset</span>
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>Stored securely in local session. Zero complex login required for judges.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
