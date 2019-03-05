const util = require('util');
const events = require('events');
const spath = process.cwd() + '/node_modules/nightwatch/lib/testsuite/screenshots.js'
const Screenshots = require(spath);

/*
 * This custom command allows us to locate an HTML element on the page and then wait until the element is both visible
 * and does not have a "disabled" state.  It rechecks the element state every 500ms until either it evaluates to true or
 * it reaches maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle
 * asynchronous code so this command is also an EventEmitter.
 */

function TakeScreenshot() {
    events.EventEmitter.call(this);
    this.startTimeInMilliseconds = null;
}

util.inherits(TakeScreenshot, events.EventEmitter);

TakeScreenshot.prototype.command = function(logMessage, filename, callback = function() {}) {
    var self = this;
    const fileName = self.api.globals.screenshotPath + filename;
    self.api.screenshot(true, result => {
        return new Promise((resolve, reject) => {
            //gets the assert in the log for picture to append to
            self.api.assert.ok(true, logMessage);

            Screenshots.writeScreenshotToFile(fileName, result.value, err => {
                const cbResult = callback.call(this, result, err);
                if (cbResult instanceof Promise) {
                    cbResult.then(_ => resolve(result)).catch(ex => reject(ex));
                } else {
                    //find the assertion from the above message and attach screenshot
                    const assertions = self.api.currentTest.results.assertions || [];
                    let currentAssertion = assertions[assertions.length-1];
                    currentAssertion.screenshots = currentAssertion.screenshots || [];
                    currentAssertion.screenshots.push(fileName);
                    resolve(result);
                    self.emit('complete');
                }
            });
        });
    });

    return this;
};


module.exports = TakeScreenshot;
