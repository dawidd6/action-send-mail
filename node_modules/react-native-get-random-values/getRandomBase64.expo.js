const { NativeModules } = require('react-native')

// In the Expo managed workflow the getRandomBase64 method is provided by ExpoRandom.getRandomBase64String
if (!NativeModules.ExpoRandom) {
  throw new Error('Expo managed workflow support for react-native-get-random-values is only available in SDK 39 and higher.')
}

module.exports = NativeModules.ExpoRandom.getRandomBase64String
