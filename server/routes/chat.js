import express from 'express';
import { chat } from '../services/geminiService.js';

const router = express.Router();

// POST /api/chat
router.post('/', async (req, res) => {
  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }
  try {
    const result = await chat(message.trim(), history);
    res.json({ success: true, reply: result.reply, error: result.error });
  } catch (err) {
    console.error('[SkillBridge AI] Chat route error:', err);
    res.status(500).json({ 
      success: false, 
      reply: "I'm having trouble connecting to the AI right now. Please try again.",
      error: 'Failed to process chat request' 
    });
  }
});

export default router;
