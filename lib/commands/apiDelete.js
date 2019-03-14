const EventEmitter = require('events');

class apiDelete extends EventEmitter {

    command(options, callback) {
        const defaults = {
            method: 'DELETE',
            uri: '',
            auth: ""
        };
        const opts = Object.assign({}, options, defaults) ;
        let request = require("request-promise-native") ;
        return request(opts) ;
    }
}
module.exports = apiDelete;


