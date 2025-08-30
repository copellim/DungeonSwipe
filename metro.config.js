const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper resolver configuration
config.resolver.assetExts.push('bin');

module.exports = config;
