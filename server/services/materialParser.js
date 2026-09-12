/**
 * SkillBridge AI - Learning Material Text & Topic Extraction Service
 * Handles PDF, PPTX, text notes, and URLs cleanly with safe size limits.
 */

import AdmZip from 'adm-zip';
import pdfParse from 'pdf-parse';

// Maximum characters passed to AI to ensure fast processing and stay well within context windows
const MAX_EXTRACTED_CHARS = 12000;

/**
 * Extracts plain text from an uploaded file buffer based on extension / mimetype
 */
export async function extractTextFromFile(fileBuffer, originalName, mimeType) {
  const ext = originalName.split('.').pop().toLowerCase();

  if (ext === 'pdf' || mimeType === 'application/pdf') {
    return extractPdfText(fileBuffer);
  }

  if (ext === 'pptx' || ext === 'ppt') {
    return extractPptxText(fileBuffer);
  }

  if (ext === 'txt' || ext === 'md' || ext === 'csv' || mimeType.startsWith('text/')) {
    return fileBuffer.toString('utf-8');
  }

  // Fallback: attempt utf-8 string decode
  const str = fileBuffer.toString('utf-8');
  if (str.replace(/[\x00-\x08\x0E-\x1F]/g, '').length > str.length * 0.8) {
    return str;
  }

  throw new Error(`Unsupported file type: .${ext}. Please upload PDF, PPTX, or TXT documents.`);
}

/**
 * PDF Text Extraction using pdf-parse
 */
async function extractPdfText(buffer) {
  try {
    const data = await pdfParse(buffer);
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('PDF did not contain readable text (it may be a scanned image).');
    }
    return data.text;
  } catch (err) {
    throw new Error(`Failed to parse PDF document: ${err.message}`);
  }
}

/**
 * PPTX Text Extraction using AdmZip pure-JS XML parsing
 * PPTX files are zip archives containing slide XML files inside ppt/slides/
 */
function extractPptxText(buffer) {
  try {
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();

    const slideEntries = zipEntries.filter(entry =>
      entry.entryName.startsWith('ppt/slides/slide') && entry.entryName.endsWith('.xml')
    );

    if (slideEntries.length === 0) {
      // Check for legacy or notes
      const notes = zipEntries.filter(entry => entry.entryName.endsWith('.xml'));
      if (notes.length === 0) {
        throw new Error('No slide XML entries found in presentation.');
      }
    }

    // Sort slide entries numerically
    slideEntries.sort((a, b) => {
      const numA = parseInt(a.entryName.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.entryName.replace(/\D/g, ''), 10) || 0;
      return numA - numB;
    });

    let extractedText = '';

    slideEntries.forEach((entry, idx) => {
      const xmlContent = entry.getData().toString('utf-8');
      // Extract all text inside <a:t>...</a:t> tags
      const textMatches = xmlContent.match(/<a:t(?:\s+[^>]*)?>([^<]*)<\/a:t>/gi) || [];
      const slideText = textMatches
        .map(tag => tag.replace(/<[^>]+>/g, '').trim())
        .filter(t => t.length > 0)
        .join(' ');

      if (slideText) {
        extractedText += `\n[Slide ${idx + 1}]\n${slideText}\n`;
      }
    });

    if (!extractedText.trim()) {
      throw new Error('Presentation did not contain extractable text elements.');
    }

    return extractedText;
  } catch (err) {
    throw new Error(`PPTX extraction error: ${err.message}`);
  }
}

/**
 * Extracts key educational topics and concepts from text content
 */
export function extractTopicsFromText(text) {
  if (!text || typeof text !== 'string') return ['General Fundamentals'];

  // Clean text and split by lines/sentences
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const candidateTopics = new Set();

  // Pattern 1: Look for headings, bullets, slide markers
  for (const line of lines) {
    const headingMatch = line.match(/^(?:#+|\d+\.|\*|-|Chapter|Unit|Topic|Module|Slide\s+\d+:?)\s*([A-Za-z0-9\s,&:\-/]{3,60})/i);
    if (headingMatch && headingMatch[1].trim().length > 3) {
      const cleaned = headingMatch[1].replace(/[:\-]/g, '').trim();
      if (!cleaned.toLowerCase().includes('page') && !cleaned.toLowerCase().includes('slide')) {
        candidateTopics.add(cleaned);
      }
    }
  }

  // Pattern 2: Look for capitalized technical phrases (e.g., "Convolutional Neural Networks", "Binary Search Tree")
  const capitalizedPhrases = text.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b/g) || [];
  const freqMap = {};
  for (const phrase of capitalizedPhrases) {
    if (phrase.length > 5 && phrase.length < 45) {
      freqMap[phrase] = (freqMap[phrase] || 0) + 1;
    }
  }

  // Sort by frequency
  const sortedByFreq = Object.keys(freqMap)
    .sort((a, b) => freqMap[b] - freqMap[a])
    .slice(0, 10);

  sortedByFreq.forEach(p => candidateTopics.add(p));

  const results = Array.from(candidateTopics)
    .filter(t => !['Table Of Contents', 'Introduction', 'Conclusion', 'Summary', 'All Rights Reserved'].includes(t))
    .slice(0, 8);

  if (results.length === 0) {
    return [
      'Core Principles & Concepts',
      'Architecture & Design Patterns',
      'Implementation & Practical Applications',
      'Evaluation & Performance Optimization'
    ];
  }

  return results;
}

/**
 * Truncates text safely at sentence or paragraph boundary
 */
export function limitDocumentText(text, maxChars = MAX_EXTRACTED_CHARS) {
  if (!text) return '';
  if (text.length <= maxChars) return text;

  const slice = text.substring(0, maxChars);
  const lastPeriod = slice.lastIndexOf('.');
  if (lastPeriod > maxChars * 0.7) {
    return slice.substring(0, lastPeriod + 1);
  }
  return slice + '...';
}
