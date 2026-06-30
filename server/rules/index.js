const { detectUnnecessaryVectorMaxTracker } = require('./vectorMaxTracker');
const { detectBinarySearchBoundaryIssues } = require('./BinarySearchBoundary');
const { detectUnnecessaryHelperFunction } = require('./helperFunctionInline');

module.exports = {
  lineBasedRules: [
    detectUnnecessaryVectorMaxTracker,
    detectBinarySearchBoundaryIssues
  ],
  fullCodeRules: [
    detectUnnecessaryHelperFunction // needs fullCode, handled separately
  ]
};