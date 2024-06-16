/* eslint-disable */
export default {
  displayName: 'music-artwork-generator-api',

  globals: {},
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/music-artwork-generator-api',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
};
