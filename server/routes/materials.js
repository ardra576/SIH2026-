import express from 'express';
import multer from 'multer';
import { extractTextFromFile, extractTopicsFromText, limitDocumentText } from '../services/materialParser.js';

const router = express.Router();

// Memory storage for fast processing without cluttering disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB limit
  }
});

/**
 * POST /api/process-material
 * Handles both file upload (PDF/PPTX/TXT) and raw text notes or URLs
 */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    let materialName = 'Learning Material';
    let fileType = 'Text Note';
    let extractedText = '';
    let fileSize = 'Custom Input';

    if (req.file) {
      materialName = req.file.originalname;
      const ext = materialName.split('.').pop().toUpperCase();
      fileType = ext === 'PPTX' || ext === 'PPT' ? 'PPTX Presentation' : (ext === 'PDF' ? 'PDF Document' : 'Text File');
      fileSize = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;

      extractedText = await extractTextFromFile(req.file.buffer, req.file.originalname, req.file.mimetype);
    } else if (req.body.content) {
      extractedText = req.body.content;
      materialName = req.body.title || 'Pasted Notes / Document';
      fileType = req.body.type || 'Text Note';
      fileSize = `${(Buffer.byteLength(extractedText, 'utf8') / 1024).toFixed(1)} KB`;
    } else if (req.body.url) {
      materialName = req.body.url;
      fileType = 'Web Article';
      // Safe fallback for URL input
      extractedText = req.body.fallbackText || `Content extracted from reference link: ${req.body.url}`;
      fileSize = 'Web Resource';
    } else {
      return res.status(400).json({
        success: false,
        error: 'No file or text content provided. Please upload a file or paste your notes.'
      });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'The uploaded material appears to be empty or unreadable.'
      });
    }

    // Extract topics
    const topics = extractTopicsFromText(extractedText);
    const safeText = limitDocumentText(extractedText);

    res.json({
      success: true,
      material: {
        id: `mat-${Date.now()}`,
        name: materialName,
        type: fileType,
        size: fileSize,
        uploadDate: new Date().toISOString().split('T')[0],
        topics,
        extractedLength: extractedText.length,
        snippet: extractedText.substring(0, 300).replace(/\s+/g, ' ').trim() + '...',
        content: safeText
      }
    });
  } catch (err) {
    console.error('[Process Material Error]:', err.message);
    res.status(400).json({
      success: false,
      error: 'Material processing failed',
      details: err.message
    });
  }
});

export default router;
