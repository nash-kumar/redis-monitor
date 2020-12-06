
/**
 * Return a md5 string.
 * @param {String} s
 */

module.exports.md5 = (s) => require("crypto").createHash('md5').update(s).digest("hex");
