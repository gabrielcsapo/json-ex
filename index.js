module.exports = {
    stringify: function stringify(obj) {

        var iso8061 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;

        return JSON.stringify(obj, function(key, value) {
            var fnBody;

            if (value instanceof Function || typeof value == 'function') {
                fnBody = value.toString();

                if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
                    return '_NuFrRa_' + fnBody;
                }
                return fnBody;
            }

            if (value && value && value.match && value.match(iso8061)) {
                return '_DateEx_' + value;
            }
            if (value instanceof RegExp) {
                return '_PxEgEr_' + value;
            }
            // if it is an object check if that object has a class
            if (typeof value === 'object' && obj[key]) {
                return '_BuffEx_' + JSON.stringify(value);
            }
            return value;
        });
    },
    parse: function parse(str) {

        return JSON.parse(str, function(key, value) {
            var prefix;

            if (typeof value != 'string') {
                return value;
            }
            if (value.length < 8) {
                return value;
            }

            prefix = value.substring(0, 8);

            if (prefix === 'function') {
                return eval('(' + value + ')');
            }
            if (prefix === '_NuFrRa_') {
                return eval(value.slice(8));
            }
            if (prefix === '_PxEgEr_') {
                return eval(value.slice(8));
            }
            if (prefix === '_DateEx_') {
                return new Date(value.slice(8));
            }
            if (prefix === '_BuffEx_') {
                return new Buffer(JSON.parse(value.slice(8)));
            }

            return value;
        });
    }
}
