const util = require('util');
const events = require('events');
const Screenshot = require('jest-screenshot');
const UniqueFilename = require("./uniqueFilename.js");


function writeScreenshotToFile(fileName, content, cb = function() {}) {
    fs.writeFileSync(fileName, content, 'base64');
    cb() ;
}

function takeScreenshot(client) {

    var self = this;
    client.screenshot(true, result => {
        return new Promise((resolve, reject) => {
            //gets the assert in the log for picture to append to
            let imageFilename = UniqueFilename.getUniqueFilename(folder, filename);
            writeScreenshotToFile(imageFilename, result.value, err => {
                const cbResult = callback.call(this, result, err);
                if (cbResult instanceof Promise) {
                    cbResult.then(_ => resolve(result)).catch(ex => reject(ex));
                } else {
                    resolve(result.value);
                }
            });
        });
    });

    return this;
};


module.exports = takeScreenshot;
