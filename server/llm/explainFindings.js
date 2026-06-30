const fetch = require('node-fetch');

function buildPrompt(findings, code) {
  return `You are a helpful code review assistant for a C++ competitive programmer.
Below is a list of optimization/bug findings detected by a static analyzer.
For each finding, write a short, friendly explanation (2-3 sentences) of WHY
it matters and HOW to fix it. Keep tone encouraging, not condescending.

Findings (JSON):
${JSON.stringify(findings, null, 2)}

Relevant code:
${code}

Respond ONLY with valid JSON, no preamble, no markdown fences, in this format:
[
  { "line": <number>, "rule": "<rule name>", "explanation": "<explanation>", "fixExample": "<short code snippet>" }
]`;
}

async function explainFindings(findings, code) {
  if (findings.length === 0) return [];

  const prompt = buildPrompt(findings, code);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
  const cleaned = text.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse Gemini response:', err, text);
    return findings.map(f => ({ ...f, explanation: f.message, fixExample: '' }));
  }
}

module.exports = { explainFindings };