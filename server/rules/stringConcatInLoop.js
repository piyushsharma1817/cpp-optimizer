function detectStringConcatInLoop(lines) {
  const findings = [];
  let insideLoop = false;
  let braceDepth = 0;

  for (const line of lines) {
    if (/for\s*\(.*\)|while\s*\(.*\)/.test(line.text)) {
      insideLoop = true;
    }
    if (insideLoop) {
      if (/\{/.test(line.text)) braceDepth++;
      if (/\}/.test(line.text)) {
        braceDepth--;
        if (braceDepth <= 0) {
          insideLoop = false;
          braceDepth = 0;
        }
      }
      // detect string += inside loop (result += something, where result is a string-like name)
      if (/\w+\s*\+=\s*.+/.test(line.text) && !/int|long|double|float/.test(line.text)) {
        findings.push({
          rule: 'string-concat-in-loop',
          line: line.number,
          message: 'String concatenation using += inside a loop can be O(n²) overall due to repeated reallocation. Consider using stringstream or reserve() to preallocate capacity.',
          severity: 'optimization'
        });
      }
    }
  }
  return findings;
}
module.exports = { detectStringConcatInLoop };