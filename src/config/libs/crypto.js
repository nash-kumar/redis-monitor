const crypto = require("crypto");

/**
 * Create a md5 string.
 * @param {String} s
 */

module.exports.md5 = (s) => {
  s = s.toString("utf-8");
  let inputHash = crypto.createHash("md5");
  inputHash.update(new Buffer(s, "binary"));
  return inputHash.digest("hex");
};
