function detectNestedLoopPairFinding(lines) {
  const findings = [];
  for (let i = 0; i < lines.length; i++) {
    if (/for\s*\(.*\)/.test(lines[i].text)) {
      // look ahead a few lines for a second nested for loop
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        if (/for\s*\(.*\)/.test(lines[j].text)) {
          findings.push({
            rule: 'nested-loop-pair-finding',
            line: lines[i].number,
            message: 'Nested loops here run in O(n²). If you\'re searching for pairs/complements, an unordered_map/unordered_set can often reduce this to O(n).',
            severity: 'optimization'
          });
          break;
        }
      }
    }
  }
  return findings;
}
module.exports = { detectNestedLoopPairFinding };