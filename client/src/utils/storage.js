/**
 * SkillBridge AI - Storage Utility
 * Safe, synchronized LocalStorage manager with SIH demo seeding and reset capability.
 */

import {
  INITIAL_PROFILE,
  INITIAL_COMPETENCIES,
  INITIAL_STATS,
  INITIAL_MATERIALS,
  INITIAL_QUIZ_HISTORY,
  INITIAL_ACHIEVEMENTS
} from '../data/initialState.js';

const KEYS = {
  PROFILE: 'sb_profile',
  COMPETENCIES: 'sb_competencies',
  STATS: 'sb_stats',
  MATERIALS: 'sb_materials',
  QUIZ_HISTORY: 'sb_quiz_history',
  ACHIEVEMENTS: 'sb_achievements'
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error accessing localStorage key "${key}":`, e);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving to localStorage key "${key}":`, e);
  }
}

export const storage = {
  getProfile() {
    return safeGet(KEYS.PROFILE, INITIAL_PROFILE);
  },

  saveProfile(profile) {
    safeSet(KEYS.PROFILE, profile);
    return profile;
  },

  getCompetencies() {
    return safeGet(KEYS.COMPETENCIES, INITIAL_COMPETENCIES);
  },

  updateCompetency(skillIdOrName, newScore) {
    const list = this.getCompetencies();
    const cleanTarget = String(skillIdOrName).toLowerCase().replace(/\s+/g, '-');

    const updated = list.map(c => {
      const cId = c.id.toLowerCase().replace(/\s+/g, '-');
      const cName = c.name.toLowerCase().replace(/\s+/g, '-');
      if (cId === cleanTarget || cName === cleanTarget || cName.includes(cleanTarget) || cleanTarget.includes(cName)) {
        return {
          ...c,
          beforeScore: c.score,
          score: Math.min(100, Math.max(0, Math.round(newScore)))
        };
      }
      return c;
    });

    safeSet(KEYS.COMPETENCIES, updated);

    // Recalculate overall competency
    const avg = Math.round(updated.reduce((sum, item) => sum + item.score, 0) / updated.length);
    const stats = this.getStats();
    stats.overallCompetency = avg;
    safeSet(KEYS.STATS, stats);

    return updated;
  },

  getStats() {
    return safeGet(KEYS.STATS, INITIAL_STATS);
  },

  updateStats(partialStats) {
    const current = this.getStats();
    const updated = { ...current, ...partialStats };
    safeSet(KEYS.STATS, updated);
    return updated;
  },

  getMaterials() {
    return safeGet(KEYS.MATERIALS, INITIAL_MATERIALS);
  },

  addMaterial(material) {
    const list = this.getMaterials();
    const updated = [material, ...list];
    safeSet(KEYS.MATERIALS, updated);
    return updated;
  },

  getQuizHistory() {
    return safeGet(KEYS.QUIZ_HISTORY, INITIAL_QUIZ_HISTORY);
  },

  addQuizResult(result) {
    const history = this.getQuizHistory();
    const entry = {
      id: `q-hist-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...result
    };
    const updated = [entry, ...history];
    safeSet(KEYS.QUIZ_HISTORY, updated);

    // Increment quizzes completed and learning hours
    const stats = this.getStats();
    stats.quizzesCompleted = (stats.quizzesCompleted || 0) + 1;
    stats.learningHours = Number(((stats.learningHours || 0) + 0.5).toFixed(1));
    safeSet(KEYS.STATS, stats);

    return updated;
  },

  getAchievements() {
    return safeGet(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  },

  resetAllData() {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
      localStorage.setItem(KEYS.COMPETENCIES, JSON.stringify(INITIAL_COMPETENCIES));
      localStorage.setItem(KEYS.STATS, JSON.stringify(INITIAL_STATS));
      localStorage.setItem(KEYS.MATERIALS, JSON.stringify(INITIAL_MATERIALS));
      localStorage.setItem(KEYS.QUIZ_HISTORY, JSON.stringify(INITIAL_QUIZ_HISTORY));
      localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(INITIAL_ACHIEVEMENTS));
      return true;
    } catch (e) {
      console.error('Failed to reset localStorage data:', e);
      return false;
    }
  }
};
