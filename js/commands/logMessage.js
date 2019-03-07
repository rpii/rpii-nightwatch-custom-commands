const util = require('util');
const events = require('events');

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
