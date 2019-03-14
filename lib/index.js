/**
 * Path to this module's directory. Add to the 'custom_commands_path' array in your
 * Nightwatch configuration:
 *
 * const commands = require('@nightwatch-ci-custom-commands')
 *
 * module.exports = {
 *   [...your nightwatch configuration...]
 *   custom_commands_path: [ commands.path ],
 * }
 */
module.exports = {
    commandPath: __dirname + '/commands',
    assertionPath: __dirname + '/assertions'
};


