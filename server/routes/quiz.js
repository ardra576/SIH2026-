import express from 'express';
import { generateQuiz } from '../services/geminiService.js';

const router = express.Router();

/**
 * POST /api/generate-quiz
 * Generates an AI quiz with schema guarantees
 */
router.post('/', async (req, res) => {
  try {
    const { materialText, topic, difficulty, questionCount } = req.body;

    const quiz = await generateQuiz({
      materialText,
      topic,
      difficulty: difficulty || 'Medium',
      questionCount: questionCount || 5
    });

    res.json({
      success: true,
      quiz
    });
  } catch (err) {
    console.error('[Quiz Generation Error]:', err.message);
    res.status(500).json({
      success: false,
      error: 'Quiz generation failed. Please try again.',
      details: err.message
    });
  }
});

/**
 * POST /api/evaluate-quiz
 * Server-side evaluation to ensure answer integrity and detailed reporting
 */
router.post('/evaluate', (req, res) => {
  try {
    const { questions, userAnswers } = req.body;

    if (!Array.isArray(questions) || !userAnswers || typeof userAnswers !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid submission data for evaluation'
      });
    }

    let correctCount = 0;
    const evaluatedQuestions = questions.map((q, idx) => {
      const selectedOptionIndex = userAnswers[q.id] !== undefined ? Number(userAnswers[q.id]) : null;
      const isCorrect = selectedOptionIndex === q.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        id: q.id,
        question: q.question,
        options: q.options,
        userAnswerIndex: selectedOptionIndex,
        userAnswerText: selectedOptionIndex !== null ? q.options[selectedOptionIndex] : 'Unanswered',
        correctAnswerIndex: q.correctAnswer,
        correctAnswerText: q.options[q.correctAnswer],
        isCorrect,
        explanation: q.explanation
      };
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    let performanceLabel = 'Needs Improvement';
    if (percentage >= 80) performanceLabel = 'Excellent Mastery';
    else if (percentage >= 60) performanceLabel = 'Proficient';
    else if (percentage >= 40) performanceLabel = 'Developing';

    res.json({
      success: true,
      evaluation: {
        score: correctCount,
        total,
        percentage,
        performanceLabel,
        completedAt: new Date().toISOString(),
        details: evaluatedQuestions
      }
    });
  } catch (err) {
    console.error('[Quiz Evaluation Error]:', err.message);
    res.status(500).json({
      success: false,
      error: 'Evaluation failed',
      details: err.message
    });
  }
});

export default router;
