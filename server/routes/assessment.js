import express from 'express';
import { generateCompetencyAssessment } from '../services/geminiService.js';

const router = express.Router();

/**
 * POST /api/generate-assessment
 * Generates AI competency assessment questions
 */
router.post('/', async (req, res) => {
  try {
    const { competency, difficulty, questionCount } = req.body;

    if (!competency) {
      return res.status(400).json({
        success: false,
        error: 'Competency name is required'
      });
    }

    const assessment = await generateCompetencyAssessment({
      competency,
      difficulty: difficulty || 'Medium',
      questionCount: questionCount || 5
    });

    res.json({
      success: true,
      assessment
    });
  } catch (err) {
    console.error('[Assessment Generation Error]:', err.message);
    res.status(500).json({
      success: false,
      error: 'Assessment generation failed',
      details: err.message
    });
  }
});

export default router;
