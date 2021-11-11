module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: { '\\.(css|less)$': 'identity-obj-proxy' },
  transform: {
    '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
    '^(?!.*\\.(css|less)$)': 'identity-obj-proxy',
  },
};
