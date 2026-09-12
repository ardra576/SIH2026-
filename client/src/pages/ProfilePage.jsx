import React, { useState } from 'react';
import { Save, Plus, X, User, BookOpen, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { storage } from '../utils/storage';
import { showToast } from '../components/Toast';

export default function ProfilePage() {
  const [profile, setProfile] = useState(storage.getProfile());
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newCert, setNewCert] = useState('');

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddTechSkill = (e) => {
    e.preventDefault();
    if (!newTechSkill.trim()) return;
    if (!profile.technicalSkills.includes(newTechSkill.trim())) {
      setProfile({ ...profile, technicalSkills: [...profile.technicalSkills, newTechSkill.trim()] });
    }
    setNewTechSkill('');
  };

  const handleRemoveTechSkill = (skill) => {
    setProfile({
      ...profile,
      technicalSkills: profile.technicalSkills.filter(s => s !== skill)
    });
  };

  const handleAddSoftSkill = (e) => {
    e.preventDefault();
    if (!newSoftSkill.trim()) return;
    if (!profile.softSkills.includes(newSoftSkill.trim())) {
      setProfile({ ...profile, softSkills: [...profile.softSkills, newSoftSkill.trim()] });
    }
    setNewSoftSkill('');
  };

  const handleRemoveSoftSkill = (skill) => {
    setProfile({
      ...profile,
      softSkills: profile.softSkills.filter(s => s !== skill)
    });
  };

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!newCert.trim()) return;
    setProfile({ ...profile, certifications: [...(profile.certifications || []), newCert.trim()] });
    setNewCert('');
  };

  const handleRemoveCert = (cert) => {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter(c => c !== cert)
    });
  };

  const handleSave = () => {
    storage.saveProfile(profile);
    showToast('Learner profile updated successfully!', 'success');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Learner Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage your academic credentials, skill taxonomy, and certification history.
          </p>
        </div>

        <button onClick={handleSave} className="btn-primary" style={{ padding: '0.75rem 1.6rem' }}>
          <Save size={18} />
          <span>Save Profile Changes</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Personal Information & Education */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Personal Information */}
          <div className="glass-card card-padding">
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <User size={20} color="#8B5CF6" />
              <span>Personal Information</span>
            </h3>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Career Track / Role</label>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Experience Bracket</label>
              <input
                type="text"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Education */}
          <div className="glass-card card-padding">
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <BookOpen size={20} color="#3B82F6" />
              <span>Education & Qualifications</span>
            </h3>

            <div className="form-group">
              <label className="form-label">Qualification / Degree</label>
              <input
                type="text"
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Training History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Technical Skills */}
          <div className="glass-card card-padding">
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={20} color="#A78BFA" />
              <span>Technical Skills</span>
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {profile.technicalSkills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: 'rgba(139, 92, 246, 0.15)',
                    color: '#C4B5FD',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>{skill}</span>
                  <button onClick={() => handleRemoveTechSkill(skill)} style={{ color: '#C4B5FD', display: 'flex' }}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddTechSkill} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newTechSkill}
                onChange={(e) => setNewTechSkill(e.target.value)}
                placeholder="Add technical skill (e.g. PyTorch, GraphQL)"
                className="form-input"
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0 1rem' }}>
                <Plus size={16} />
              </button>
            </form>
          </div>

          {/* Soft Skills */}
          <div className="glass-card card-padding">
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <CheckCircle2 size={20} color="#10B981" />
              <span>Soft Skills & Competencies</span>
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {profile.softSkills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#6EE7B7',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>{skill}</span>
                  <button onClick={() => handleRemoveSoftSkill(skill)} style={{ color: '#6EE7B7', display: 'flex' }}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddSoftSkill} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                placeholder="Add soft skill (e.g. Critical Thinking)"
                className="form-input"
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0 1rem' }}>
                <Plus size={16} />
              </button>
            </form>
          </div>

          {/* Certifications */}
          <div className="glass-card card-padding">
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Award size={20} color="#F59E0B" />
              <span>Certifications & Honours</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {profile.certifications?.map((cert) => (
                <div
                  key={cert}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem'
                  }}
                >
                  <span style={{ color: 'var(--text-main)' }}>{cert}</span>
                  <button onClick={() => handleRemoveCert(cert)} style={{ color: 'var(--text-muted)' }}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCert} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newCert}
                onChange={(e) => setNewCert(e.target.value)}
                placeholder="Add certification (e.g. AWS Certified Developer)"
                className="form-input"
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0 1rem' }}>
                <Plus size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
