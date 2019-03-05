const util = require('util');
const events = require('events');

/*
 * This custom command allows us to locate an HTML element on the page and then wait until the element is both visible
 * and does not have a "disabled" state.  It rechecks the element state every 500ms until either it evaluates to true or
 * it reaches maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle
 * asynchronous code so this command is also an EventEmitter.
 */

function LogMessage() {
    events.EventEmitter.call(this);
    this.startTimeInMilliseconds = null;
}

util.inherits(LogMessage, events.EventEmitter);


LogMessage.prototype.command = function(logMessage, callback = function() {}) {
    var self = this;
    self.api.assert.ok(true, logMessage);
    self.emit('complete');
    return this;
};


module.exports = LogMessage;
