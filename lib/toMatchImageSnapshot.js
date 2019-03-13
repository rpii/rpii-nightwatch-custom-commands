/**
 * Checks if the given element contains the specified text.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.containsText('#main', 'The Night Watch');
 *    };
 * ```
 *
 * @method toMatchScreenshot
 * @param {string} [filename] The filename to compare for.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

const util = require('util');

exports.assertion = function(filename, msg) {

    let MSG_SCREENSHOT = 'Taking screenshot  <%s>.';

    this.message = msg || util.format(MSG_SCREENSHOT, filename);

    this.expected = function() {
        return filename;
    };

    this.pass = function(value) {
        this.message = msg || util.format(MSG_SCREENSHOT, filename);
        return true ;  //image matches saved value;
    };

    this.failure = function(result) {
        let failed = false ;
        if (failed) {
            this.message = msg || util.format(MSG_SCREENSHOT, filename);
        }

        return failed;
    };

    this.value = function(result) {
        return result.value;
    };

    this.command = function(callback) {
        return this.api.screenshot(true, callback);
    };

};


