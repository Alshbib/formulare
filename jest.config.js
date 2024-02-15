// module.exports = {
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '^node-fetch$': 'fetch-mock-jest',
//   },
//     transform: {
//       '^.+\\.tsx?$': 'ts-jest',
//     },
//     testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   };

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    "^compnents/(.*)$": "<rootDir>/compnents/$1",
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
