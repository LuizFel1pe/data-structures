export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: '50%',
  testEnvironment: 'node',
  displayName: 'data-structures',
  collectCoverageFrom: [],
  watchPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules', 'utils'],
  testMatch: ['**/tests/**/*.test.js'],
};
