/**
 * SkillBridge AI - AI JSON Response Cleaner and Validator
 * Strictly sanitizes, extracts, parses, and validates JSON from Gemini model outputs.
 */

export function cleanAIJsonResponse(rawText, expectedType = 'quiz') {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('AI response is empty or not a string');
  }

  // 1. Trim whitespace
  let text = rawText.trim();

  // 2. Remove ```json ... ``` or ``` ... ``` markdown fences
  text = text.replace(/^```json\s*/i, '');
  text = text.replace(/^```\s*/i, '');
  text = text.replace(/\s*```$/i, '');

  // 3. Find the outermost JSON bounds: first '{' and last '}'
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('No valid JSON object boundaries found in AI response');
  }

  const jsonString = text.substring(firstBrace, lastBrace + 1);

  // 4. Parse using JSON.parse
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    // Attempt fallback fixes for common JSON errors like trailing commas
    try {
      const sanitized = jsonString
        .replace(/,\s*([\]}])/g, '$1') // remove trailing commas
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":'); // ensure double quotes around keys
      parsed = JSON.parse(sanitized);
    } catch (secondErr) {
      throw new Error(`JSON parsing failed: ${err.message}`);
    }
  }

  // 5. Schema Validation based on expected type
  if (expectedType === 'quiz' || expectedType === 'assessment') {
    return validateQuizSchema(parsed);
  }

  if (expectedType === 'analysis') {
    return validateAnalysisSchema(parsed);
  }

  return parsed;
}

/**
 * Validates and normalizes Quiz or Assessment schema
 */
function validateQuizSchema(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Root JSON must be an object');
  }

  const title = typeof data.title === 'string' && data.title.trim() ? data.title.trim() : 'SkillBridge AI Assessment';
  const topic = typeof data.topic === 'string' && data.topic.trim() ? data.topic.trim() : (data.competency || 'General Competency');

  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error('JSON response must contain a non-empty "questions" array');
  }

  const validatedQuestions = [];
  const seenQuestions = new Set();

  for (let i = 0; i < data.questions.length; i++) {
    const q = data.questions[i];
    if (!q || typeof q !== 'object') continue;

    const questionText = typeof q.question === 'string' ? q.question.trim() : '';
    if (!questionText || seenQuestions.has(questionText.toLowerCase())) {
      continue; // avoid duplicates and empty questions
    }
    seenQuestions.add(questionText.toLowerCase());

    // Validate options: exactly 4 items
    let options = Array.isArray(q.options) ? q.options.map(opt => String(opt).trim()) : [];
    if (options.length < 4) {
      // Pad if slightly short
      while (options.length < 4) {
        options.push(`Alternative Option ${options.length + 1}`);
      }
    } else if (options.length > 4) {
      options = options.slice(0, 4);
    }

    // Normalize correctAnswer to 0..3 integer
    let correctAnswer = 0;
    if (typeof q.correctAnswer === 'number' && Number.isInteger(q.correctAnswer)) {
      correctAnswer = Math.max(0, Math.min(3, q.correctAnswer));
    } else if (typeof q.correctAnswer === 'string') {
      const trimmed = q.correctAnswer.trim().toUpperCase();
      if (trimmed === 'A' || trimmed === '0') correctAnswer = 0;
      else if (trimmed === 'B' || trimmed === '1') correctAnswer = 1;
      else if (trimmed === 'C' || trimmed === '2') correctAnswer = 2;
      else if (trimmed === 'D' || trimmed === '3') correctAnswer = 3;
      else {
        const parsedIdx = options.findIndex(opt => opt.toLowerCase() === trimmed.toLowerCase());
        correctAnswer = parsedIdx >= 0 ? parsedIdx : 0;
      }
    }

    const explanation = typeof q.explanation === 'string' && q.explanation.trim()
      ? q.explanation.trim()
      : `Option ${['A', 'B', 'C', 'D'][correctAnswer]} is the correct answer based on standard competencies.`;

    validatedQuestions.push({
      id: i + 1,
      question: questionText,
      options,
      correctAnswer,
      explanation
    });
  }

  if (validatedQuestions.length === 0) {
    throw new Error('No valid questions could be verified from AI output');
  }

  return {
    title,
    topic,
    questions: validatedQuestions
  };
}

/**
 * Validates and normalizes Skill Gap Analysis AI schema
 */
function validateAnalysisSchema(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Analysis root must be an object');
  }

  return {
    overview: data.overview || 'Competency assessment completed.',
    strongSummary: data.strongSummary || 'Demonstrates solid fundamentals.',
    gapSummary: data.gapSummary || 'Focus areas identified for targeted improvement.',
    actionableAdvice: Array.isArray(data.actionableAdvice)
      ? data.actionableAdvice.map(a => String(a))
      : ['Review recommended foundational modules', 'Practice hands-on quizzes to reinforce concepts']
  };
}
