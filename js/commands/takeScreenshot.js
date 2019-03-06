const util = require('util');
const events = require('events');
const spath = process.cwd() + '/node_modules/nightwatch/lib/testsuite/screenshots.js'
const Screenshots = require(spath);

function TakeScreenshot() {
    events.EventEmitter.call(this);
    this.startTimeInMilliseconds = null;
}

util.inherits(TakeScreenshot, events.EventEmitter);

TakeScreenshot.prototype.command = function(logMessage, filename, callback = function() {}) {
    var self = this;
    self.api.screenshot(true, result => {
        return new Promise((resolve, reject) => {
            //gets the assert in the log for picture to append to
            self.api.assert.ok(true, logMessage);

            Screenshots.writeScreenshotToFile(filename, result.value, err => {
                const cbResult = callback.call(this, result, err);
                if (cbResult instanceof Promise) {
                    cbResult.then(_ => resolve(result)).catch(ex => reject(ex));
                } else {
                    //find the assertion from the above message and attach screenshot
                    const assertions = self.api.currentTest.results.assertions || [];
                    let currentAssertion = assertions[assertions.length-1];
                    currentAssertion.screenshots = currentAssertion.screenshots || [];
                    currentAssertion.screenshots.push(filename);
                    resolve(result);
                    self.emit('complete');
                }
            });
        });
    });

    return this;
};


module.exports = TakeScreenshot;
