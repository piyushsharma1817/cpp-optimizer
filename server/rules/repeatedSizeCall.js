function detectRepeatedSizeCall(lines) {
  const findings = [];
  for (const line of lines) {
    if (/for\s*\(.*;\s*\w+\s*<\s*\w+\.(size|length)\(\)\s*;.*\)/.test(line.text)) {
      findings.push({
        rule: 'repeated-size-call-in-loop',
        line: line.number,
        message: 'Calling .size()/.length() in the loop condition re-evaluates it every iteration. For most STL containers this is O(1) so it\'s minor, but caching it in a variable before the loop is a small, free optimization and a good habit.',
        severity: 'style'
      });
    }
  }
  return findings;
}
module.exports = { detectRepeatedSizeCall };