// jest.config.js
export default {
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    // Add any module name mappings if necessary
  },
};
