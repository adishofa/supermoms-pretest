module.exports = {
    preset: '@testing-library/react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFilesAfterEnv: ['./jest-setup.js'],
    verbose: true,
    transform: {
        "\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        "./node_modules/(?!(expo-file-system|@react-native|react-native|expo-modules-core|expo-linking|expo-constants)/)"
    ]
};