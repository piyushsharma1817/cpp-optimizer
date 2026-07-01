function detectMissingMemoization(lines, fullCode) {
  const findings = [];
  const funcDeclRegex = /\b\w+\s+(\w+)\s*\([^)]*\)\s*\{/;

  for (const line of lines) {
    const match = line.text.match(funcDeclRegex);
    if (!match) continue;
    const funcName = match[1];

    const callsItself = new RegExp(`\\b${funcName}\\s*\\(`).test(fullCode.split(line.text)[1] || '');
    const hasMemoStructure = /dp\[|memo\[|cache\[/.test(fullCode);

    if (callsItself && !hasMemoStructure) {
      findings.push({
        rule: 'missing-memoization',
        line: line.number,
        message: `'${funcName}' appears to be recursive but no memoization structure (dp[]/memo[]/cache[]) was detected. If subproblems overlap, this may cause exponential time — consider adding memoization.`,
        severity: 'bug-risk'
      });
    }
  }
  return findings;
}
module.exports = { detectMissingMemoization };