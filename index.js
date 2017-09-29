module.exports = {
    stringify: function stringify(obj) {
        return JSON.stringify(obj, function(key, value) {
            var flags;
          
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
                flags = value.flags;
              
                if (!flags) {
                  // Older versions of node do not support the .flags property
                  // and in such versions, we must recreate their value
                  flags = '';
                  
                  if (value.global) { flags += 'g' }
                  if (value.ignoreCase) { flags += 'i' }
                  if (value.multiline) { flags += 'm' }
                }
              
                return [
                  // To properly serialize a regular expression we need both 
                  // the .source and .flags properties.
                  '_PxEgEr_["', 
                  // RegExp source escapes double quotes, for JSON we need 
                  // the opposite to be true
                  value.source.replace(/\\'/gm, "'").replace(/"/gm, '\\"'), 
                  '","', 
                  // Flags do not have quotes in them so we are safe here
                  flags, 
                '"]'].join('');
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
            var array;
            var source;
            var flags;

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
                array = JSON.parse(value.slice(8));
                source = array[0];
                flags = array[1];
                          
                return new RegExp(source, flags);
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
