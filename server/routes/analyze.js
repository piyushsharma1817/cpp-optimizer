const express = require('express');
const router = express.Router();
const { analyzeCode } = require('../analyzer/runAnalysis');
const { explainFindings } = require('../llm/explainFindings');

router.post('/analyze', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });
    const findings = analyzeCode(code);
    const explained = await explainFindings(findings, code);
    res.json({ findings: explained });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

module.exports = router;