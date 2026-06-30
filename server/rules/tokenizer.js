// Very basic line-based tokenizer.
// We don't build a full AST — just classify what's happening on each line
// related to a given variable name.

function tokenize(code) {
  return code.split('\n').map((text, i) => ({
    text: text.trim(),
    number: i + 1
  }));
}

// Find variable declarations matching a type pattern, e.g. vector<int> v;
function findDeclarations(lines, typeRegex) {
  const declarations = [];
  const declRegex = new RegExp(typeRegex.source + '\\s+(\\w+)');

  for (const line of lines) {
    const match = line.text.match(declRegex);
    if (match) {
      declarations.push({
        varName: match[1],
        lineNumber: line.number
      });
    }
  }
  return declarations;
}

// Find all lines where a variable is used, classify the operation
function findAllUsages(lines, varName, fromLine) {
  const usages = [];
  const escapedName = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  for (const line of lines) {
    if (line.number <= fromLine) continue;
    if (!new RegExp(`\\b${escapedName}\\b`).test(line.text)) continue;

    let operation = 'unknown';
    if (new RegExp(`${escapedName}\\.push_back`).test(line.text)) operation = 'push_back';
    else if (new RegExp(`${escapedName}\\.back\\(\\)`).test(line.text)) operation = '.back()';
    else if (new RegExp(`${escapedName}\\[`).test(line.text)) operation = '[i]';
    else if (new RegExp(`${escapedName}\\.size\\(\\)`).test(line.text)) operation = 'size()';
    else if (new RegExp(`sort\\(.*${escapedName}`).test(line.text)) operation = 'sort';
    else if (new RegExp(`${escapedName}\\.begin\\(\\)|${escapedName}\\.end\\(\\)`).test(line.text)) operation = 'begin()';
    else if (new RegExp(`\\w+\\(.*${escapedName}.*\\)`).test(line.text) && !line.text.includes('push_back')) {
      operation = 'passed_as_arg';
    }

    usages.push({ line: line.number, operation, text: line.text });
  }
  return usages;
}

module.exports = { tokenize, findDeclarations, findAllUsages };