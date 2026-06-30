function detectBinarySearchBoundaryIssues(lines) {
  const findings = [];

  for (const line of lines) {
    const midMatch = /mid\s*=\s*\(\s*\w+\s*\+\s*\w+\s*\)\s*\/\s*2/.test(line.text);
    const safeMidMatch = /mid\s*=\s*\w+\s*\+\s*\(\s*\w+\s*-\s*\w+\s*\)\s*\/\s*2/.test(line.text);

    if (midMatch && !safeMidMatch) {
      findings.push({
        rule: 'binary-search-overflow-risk',
        line: line.number,
        message: 'mid computed as (low+high)/2 can overflow for large values. Consider low + (high-low)/2.',
        severity: 'bug-risk'
      });
    }
  }
  return findings;
}

module.exports = { detectBinarySearchBoundaryIssues };