const { tokenize } = require('../rules/tokenizer');
const { lineBasedRules, fullCodeRules } = require('../rules');

function analyzeCode(code) {
  const lines = tokenize(code);
  let findings = [];

  for (const rule of lineBasedRules) {
    findings = findings.concat(rule(lines));
  }
  for (const rule of fullCodeRules) {
    findings = findings.concat(rule(lines, code));
  }

  return findings;
}

module.exports = { analyzeCode };