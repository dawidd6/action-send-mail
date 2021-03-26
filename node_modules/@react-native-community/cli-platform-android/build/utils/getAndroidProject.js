"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAndroidProject = getAndroidProject;
exports.getPackageName = getPackageName;

function _cliTools() {
  const data = require("@react-native-community/cli-tools");

  _cliTools = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAndroidProject(config) {
  const androidProject = config.project.android;

  if (!androidProject) {
    throw new (_cliTools().CLIError)(`
      Android project not found. Are you sure this is a React Native project?
      If your Android files are located in a non-standard location (e.g. not inside 'android' folder), consider setting
      \`project.android.sourceDir\` option to point to a new location.
    `);
  }

  return androidProject;
}
/**
 * Get the package name of the running React Native app
 * @param config
 */


function getPackageName(androidProject, appFolder) {
  const {
    appName,
    manifestPath
  } = androidProject;

  const androidManifest = _fs().default.readFileSync(manifestPath, 'utf8');

  let packageNameMatchArray = androidManifest.match(/package="(.+?)"/);

  if (!packageNameMatchArray || packageNameMatchArray.length === 0) {
    throw new (_cliTools().CLIError)(`Failed to build the app: No package name found. Found errors in ${_chalk().default.underline.dim(`${appFolder || appName}/src/main/AndroidManifest.xml`)}`);
  }

  let packageName = packageNameMatchArray[1];

  if (!validatePackageName(packageName)) {
    _cliTools().logger.warn(`Invalid application's package name "${_chalk().default.bgRed(packageName)}" in 'AndroidManifest.xml'. Read guidelines for setting the package name here: ${_chalk().default.underline.dim('https://developer.android.com/studio/build/application-id')}`);
  }

  return packageName;
} // Validates that the package name is correct


function validatePackageName(packageName) {
  return /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(packageName);
}

//# sourceMappingURL=getAndroidProject.js.map