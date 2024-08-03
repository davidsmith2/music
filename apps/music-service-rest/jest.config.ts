/* eslint-disable */
export default {
  displayName: 'music-service-rest',

  globals: {},
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/music-service-rest',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
};
