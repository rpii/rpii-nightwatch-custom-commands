const EventEmitter = require('events');

class apiGet extends EventEmitter {

    command(options, callback) {
        const defaults = {
            method: 'GET',
            uri: '',
            auth: ""
        };
        const opts = Object.assign({}, options, defaults) ;
        let request = require("request-promise-native") ;
        return request(opts) ;
    }
}
module.exports = apiGet;
