function detectPassByValueRecursion(lines, fullCode) {
  const findings = [];
  const funcDeclRegex = /\b\w+\s+(\w+)\s*\(([^)]*)\)\s*\{/;

  for (const line of lines) {
    const match = line.text.match(funcDeclRegex);
    if (!match) continue;
    const [, funcName, params] = match;

    const callsItself = new RegExp(`\\b${funcName}\\s*\\(`).test(fullCode.split(line.text)[1] || '');
    if (!callsItself) continue;

    const hasByValueContainer = /\b(vector|string|map|set)\s*<[^>]*>\s+\w+/.test(params) &&
                                  !/&/.test(params);

    if (hasByValueContainer) {
      findings.push({
        rule: 'pass-by-value-in-recursion',
        line: line.number,
        message: `'${funcName}' takes a vector/string/map by value and calls itself recursively — each call copies the entire container. Consider passing by reference (e.g., 'const vector<int>&') to avoid this overhead.`,
        severity: 'optimization'
      });
    }
  }
  return findings;
}
module.exports = { detectPassByValueRecursion };