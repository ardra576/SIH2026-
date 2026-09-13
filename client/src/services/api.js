/**
 * SkillBridge AI - Client API Service
 * Encapsulates backend HTTP calls with fail-safe error handling and transparent fallback.
 */

const API_BASE = '/api';

/**
 * Safe fetch wrapper that always returns JSON or a structured error object
 */
async function safeFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      console.warn(`Non-JSON response from ${endpoint}:`, text.substring(0, 120));
      return {
        success: false,
        error: 'The server returned an unexpected format. Please try again.',
        details: text.substring(0, 80)
      };
    }

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || `Server responded with error status ${res.status}`,
        details: data.details || ''
      };
    }

    return data;
  } catch (err) {
    console.error(`API Call failed (${endpoint}):`, err);
    return {
      success: false,
      error: 'Unable to connect to SkillBridge server. Demo fallback active.',
      details: err.message
    };
  }
}

export const api = {
  /**
   * Check backend health and Gemini status
   */
  async checkHealth() {
    return safeFetch('/health');
  },

  /**
   * Process uploaded file (FormData) or text notes (JSON)
   */
  async processMaterial(payload) {
    if (payload instanceof FormData) {
      return safeFetch('/process-material', {
        method: 'POST',
        body: payload
      });
    }

    return safeFetch('/process-material', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },

  /**
   * Generate an AI Quiz
   */
  async generateQuiz(params) {
    return safeFetch('/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
  },

  /**
   * Evaluate a completed quiz
   */
  async evaluateQuiz(submission) {
    return safeFetch('/evaluate-quiz/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });
  },

  /**
   * Generate a Competency Assessment
   */
  async generateAssessment(params) {
    return safeFetch('/generate-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
  },

  /**
   * Analyze skills and retrieve dynamic AI insights
   */
  async analyzeSkills(competencies) {
    return safeFetch('/analyze-skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competencies })
    });
  },

  /**
   * Get personalized learning recommendations
   */
  async getRecommendations(gaps = []) {
    return safeFetch('/recommend-learning/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gaps })
    });
  },

  /**
   * Send chat message to SkillBridge AI Assistant
   */
  async sendChatMessage(message, history = []) {
    return safeFetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });
  }
};
