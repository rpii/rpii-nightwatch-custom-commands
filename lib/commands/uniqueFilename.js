var moment = require('moment');

// Returns the filename of the report that should be saved to disk.
var path = require('path');

module.exports = {
    getUniqueFilename: function (rootPath, name) {
        var timeStr = '-' + moment().format('YYYYMMDD-HHmmss.SSS');
        var filename = rootPath  + name + timeStr + '.png';
        return filename;
    },

};

