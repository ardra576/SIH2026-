import express from 'express';
import { isGeminiConfigured } from '../services/geminiService.js';

const router = express.Router();

router.get('/', (req, res) => {
  const geminiActive = isGeminiConfigured();
  res.json({
    status: 'online',
    service: 'SkillBridge AI Platform API',
    version: '1.0.0',
    hackathon: 'Smart India Hackathon 2026',
    geminiConfigured: geminiActive,
    mode: geminiActive ? 'Live AI Mode (Google Gemini)' : 'Demo Mode (Offline Fail-safe Active)',
    timestamp: new Date().toISOString()
  });
});

export default router;
