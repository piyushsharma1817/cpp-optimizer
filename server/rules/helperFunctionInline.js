// Detects a function defined and called exactly once, with a trivial single-line body.
function detectUnnecessaryHelperFunction(lines, fullCode) {
  const findings = [];
  const funcDeclRegex = /\b\w+\s+(\w+)\s*\([^)]*\)\s*\{/;

  for (const line of lines) {
    const match = line.text.match(funcDeclRegex);
    if (!match) continue;
    const funcName = match[1];
    if (['main', 'solve'].includes(funcName)) continue;

    const callCount = (fullCode.match(new RegExp(`\\b${funcName}\\s*\\(`, 'g')) || []).length;
    // callCount includes the declaration itself, so 2 means "declared once, called once"
    if (callCount === 2) {
      findings.push({
        rule: 'unnecessary-helper-function',
        line: line.number,
        message: `Function '${funcName}' is called only once. Consider inlining it if it doesn't improve readability.`,
        severity: 'style'
      });
    }
  }
  return findings;
}

module.exports = { detectUnnecessaryHelperFunction };