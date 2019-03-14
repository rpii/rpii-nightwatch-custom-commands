/**
 * matches the screenshot with what it supposed to be
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.checkTitle(/The Night Watch/);
 *    };
 * ```
 *
 * @method matchesImageSnapshot
 * @param {image} expression The regex to look for.
 * @api assertions
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spath = process.cwd() + '/node_modules/nightwatch/lib/testsuite/screenshots.js'
const Screenshots = require(spath);
const UniqueFilename = require("../uniqueFilename.js") ;
const fs = require('fs');

function MatchesImageSnapshot(image, msg) {
    this.message = msg || _util2.default.format('Testing if screenshot "%s" matches snapshot.', image);
    this.image = image;
    const folder = process.cwd() + '/truth/screenshots/' ;
    const truthfilename = UniqueFilename.getTruthFilename(folder, this.image) ;
    try {
        // fs.mkdirsSync(folder) ;
        this.expected = fs.readFileSync(truthfilename);
    } catch(err) {

        this.expected = null;
    }



    this.pass = function (value) {
        if (this.expected) {
            return value == this.expected;
        } else {
            this.message += "  Snapshot file is updated." ;
            fs.writeFileSync(truthfilename, value) ;
            return true ;
        }
    };

    this.value = function (result) {
        return result.value;
    };

    this.command = function (callback) {
        var self = this;
        return self.api.screenshot(true, result => {
            return new Promise((resolve, reject) => {
                const folder = self.client.options.screenshots.path
                let imageFilename = UniqueFilename.getUniqueFilename(folder,this.image) ;
                Screenshots.writeScreenshotToFile(imageFilename, result.value, err => {
                    const cbResult = callback.call(this, result, err);
                    if (cbResult instanceof Promise) {
                        cbResult.then(_ => resolve(result)).catch(ex => reject(ex));
                    } else {
                        if (self.api.currentTest) {
                            const assertions = self.api.currentTest.results.assertions || [];
                            let currentAssertion = assertions[assertions.length - 1];
                            currentAssertion.screenshots = currentAssertion.screenshots || [];
                            currentAssertion.screenshots.push(imageFilename);
                        }
                        resolve(result.value);
                    }
                });
            });
        });
    };
}

module.exports.assertion = MatchesImageSnapshot;
