const { detectUnnecessaryVectorMaxTracker } = require('./vectorMaxTracker');
const { detectBinarySearchBoundaryIssues } = require('./BinarySearchBoundary');
const { detectUnnecessaryHelperFunction } = require('./helperFunctionInline');
const { detectRedundantSort } = require('./redundantSort');
const { detectNestedLoopPairFinding } = require('./nestedLoopPairFinding');
const { detectMissingMemoization } = require('./missingMemoization');
const { detectStringConcatInLoop } = require('./stringConcatInLoop');
const { detectRepeatedSizeCall } = require('./repeatedSizeCall');
const { detectPassByValueRecursion } = require('./passByValueRecursion');
const { detectDpRollingArrayOpportunity } = require('./dpRollingArray');

module.exports = {
  lineBasedRules: [
    detectUnnecessaryVectorMaxTracker,
    detectBinarySearchBoundaryIssues,
    detectRedundantSort,
    detectNestedLoopPairFinding,
    detectStringConcatInLoop,
    detectRepeatedSizeCall
  ],
  fullCodeRules: [
    detectUnnecessaryHelperFunction,
    detectMissingMemoization,
    detectPassByValueRecursion,
    detectDpRollingArrayOpportunity
  ]
};