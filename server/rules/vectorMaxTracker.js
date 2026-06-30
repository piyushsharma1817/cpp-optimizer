const { findDeclarations, findAllUsages } = require('./tokenizer');

function detectUnnecessaryVectorMaxTracker(lines) {
  const findings = [];
  const vectorDecls = findDeclarations(lines, /vector\s*<\s*\w+\s*>/);

  for (const decl of vectorDecls) {
    const usages = findAllUsages(lines, decl.varName, decl.lineNumber);
    if (usages.length === 0) continue;

    const opsUsed = usages.map(u => u.operation);
    const allowedOps = ['push_back', '.back()', '[i]', 'size()'];
    const usesOnlyAllowedOps = opsUsed.every(op => allowedOps.includes(op));
    const usedAsCollection = opsUsed.some(op =>
      ['sort', 'begin()', 'passed_as_arg'].includes(op)
    );

    if (usesOnlyAllowedOps && !usedAsCollection) {
      findings.push({
        rule: 'unnecessary-vector-max-tracker',
        line: decl.lineNumber,
        variable: decl.varName,
        message: `'${decl.varName}' appears to only track values one at a time — a single variable may be sufficient instead of a vector.`,
        severity: 'optimization'
      });
    }
  }
  return findings;
}

module.exports = { detectUnnecessaryVectorMaxTracker };