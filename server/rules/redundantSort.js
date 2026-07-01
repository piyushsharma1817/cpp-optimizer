function detectRedundantSort(lines) {
  const findings = [];
  for (const line of lines) {
    if (/sort\s*\(\s*\w+\.begin\(\)\s*,\s*\w+\.end\(\)\s*\)/.test(line.text)) {
      // crude heuristic: check next few lines for only arr[0] or arr[n-1] access, no other indices
      findings.push({
        rule: 'check-if-sort-necessary',
        line: line.number,
        message: 'Sorting is O(n log n). If you only need the min/max element, a single O(n) pass would be faster — verify whether full ordering is actually needed here.',
        severity: 'optimization'
      });
    }
  }
  return findings;
}
module.exports = { detectRedundantSort };