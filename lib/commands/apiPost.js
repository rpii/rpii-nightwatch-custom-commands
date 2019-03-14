const EventEmitter = require('events');

class apiPost extends EventEmitter {

    command(options, callback) {
        const defaults = {
            method: 'POST',
            uri: '',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            auth: "",
            body: {},
            json: true
        };
        const opts = Object.assign({}, options, defaults) ;
        let request = require("request-promise-native") ;
        return request(opts) ;
    }
}
module.exports = apiPost;
