module.exports = {
    stringify: function stringify(obj) {
        return JSON.stringify(obj, function(key, value) {
            if (obj[key] instanceof Function) {
                var fnBody = JSON.stringify(value.toString());

                if (fnBody.length < 8 || fnBody.substring(1, 9) !== 'function') { //this is ES6 Arrow Function
                    return '_NuFrRa_' + fnBody
                }

                return '_FuncRa_' + fnBody
            }

            if (obj[key] instanceof Date) {
                return '_DateEx_' + value;
            }
            if (value instanceof RegExp) {
                return '_PxEgEr_' + value;
            }
            // if it is an object check if that object has a class
            if (obj[key] instanceof Buffer) {
                return '_BuffEx_' + JSON.stringify(obj[key]);
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

            if (prefix === '_FuncRa_') {
                return eval('(' + JSON.parse(value.slice(8)) + ')');
            }
            if (prefix === '_NuFrRa_') {
                return eval(JSON.parse(value.slice(8)));
            }
            if (prefix === '_PxEgEr_') {
                return new RegExp(value.slice(8));
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
