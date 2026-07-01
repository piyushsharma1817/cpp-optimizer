function detectDpRollingArrayOpportunity(lines, fullCode) {
  const findings = [];
  const dp2DRegex = /vector\s*<\s*vector\s*<\s*\w+\s*>\s*>\s*(\w+)/;

  for (const line of lines) {
    const match = line.text.match(dp2DRegex);
    if (!match) continue;
    const varName = match[1];

    // crude check: does code only ever reference dp[i-1][...] or dp[i][...], never dp[i-2] or further back?
    const usesOnlyAdjacentRow = new RegExp(`${varName}\\[i-1\\]|${varName}\\[i\\]`).test(fullCode);
    const usesDeeperHistory = new RegExp(`${varName}\\[i-2\\]|${varName}\\[i-3\\]`).test(fullCode);

    if (usesOnlyAdjacentRow && !usesDeeperHistory) {
      findings.push({
        rule: 'dp-rolling-array-opportunity',
        line: line.number,
        message: `2D DP table '${varName}' appears to only reference the current and previous row. You could reduce space from O(n*m) to O(m) using a rolling array (two 1D arrays, or one with modulo indexing).`,
        severity: 'optimization'
      });
    }
  }
  return findings;
}
module.exports = { detectDpRollingArrayOpportunity };