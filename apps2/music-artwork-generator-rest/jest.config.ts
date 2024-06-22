/* eslint-disable */
export default {
  displayName: 'music-artwork-generator-rest',

  globals: {},
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps2/music-artwork-generator-rest',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
};
