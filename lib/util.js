module.exports.encode = function encode(s) {
  return encodeURIComponent(s).replace(/'/g, '&#39;');
}
module.exports.decode = function decode(s) {
  return decodeURIComponent(s).replace(/&#39;/g, '\'');
}
