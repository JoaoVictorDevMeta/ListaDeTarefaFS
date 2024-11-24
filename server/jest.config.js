export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx"],

  roots: ["<rootDir>/tests"],

  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "node",
};