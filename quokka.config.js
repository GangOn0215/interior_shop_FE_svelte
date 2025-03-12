const path = require('path');

module.exports = {
  // Quokka.js가 사용할 Babel 설정
  babel: {
    presets: ['@babel/preset-env'],
  },
  // Quokka.js가 사용할 경로 별칭 설정
  moduleNameMapper: {
    '^\\$lib(.*)$': '<rootDir>/src/lib$1',
    '^@(.*)$': '<rootDir>/src$1',
    '^@api(.*)$': '<rootDir>/src/api$1',
    '^@stores(.*)$': '<rootDir>/src/stores$1',
    '^@scss(.*)$': '<rootDir>/src/scss$1',
  },
};