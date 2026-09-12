import express from 'express';
import { generateSkillInsights } from '../services/geminiService.js';
import { DEMO_RECOMMENDATIONS } from '../utils/demoData.js';

const router = express.Router();

/**
 * POST /api/analyze-skills
 * Evaluates competencies into Strong / Moderate / Gap categories and generates AI insights
 */
router.post('/', async (req, res) => {
  try {
    const { competencies } = req.body;

    if (!competencies || (!Array.isArray(competencies) && typeof competencies !== 'object')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid competencies data provided'
      });
    }

    let compList = [];
    let scoreMap = {};

    if (Array.isArray(competencies)) {
      compList = competencies;
      competencies.forEach(c => {
        scoreMap[c.name || c.id] = Number(c.score) || 0;
      });
    } else {
      scoreMap = competencies;
      compList = Object.entries(competencies).map(([name, score]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        score: Number(score) || 0
      }));
    }

    const strong = compList.filter(c => c.score >= 70);
    const moderate = compList.filter(c => c.score >= 50 && c.score < 70);
    const gaps = compList.filter(c => c.score < 50);

    const insights = await generateSkillInsights(scoreMap);

    res.json({
      success: true,
      analysis: {
        totalSkills: compList.length,
        strong,
        moderate,
        gaps,
        insights
      }
    });
  } catch (err) {
    console.error('[Skill Analysis Error]:', err.message);
    res.status(500).json({
      success: false,
      error: 'Skill analysis failed',
      details: err.message
    });
  }
});

/**
 * POST /api/recommend-learning
 * Recommends personalized courses and learning modules based on current gaps
 */
router.post('/recommendations', (req, res) => {
  try {
    const { gaps = [] } = req.body;

    let recommendations = [...DEMO_RECOMMENDATIONS];

    // If gaps are specified, prioritize recommendations targeting those skills
    if (Array.isArray(gaps) && gaps.length > 0) {
      const gapNames = gaps.map(g => (typeof g === 'string' ? g : g.name || '').toLowerCase());

      recommendations.sort((a, b) => {
        const aMatches = gapNames.some(g => a.skill.toLowerCase().includes(g));
        const bMatches = gapNames.some(g => b.skill.toLowerCase().includes(g));
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    }

    res.json({
      success: true,
      recommendations
    });
  } catch (err) {
    console.error('[Recommendations Error]:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recommendations',
      details: err.message
    });
  }
});

export default router;
