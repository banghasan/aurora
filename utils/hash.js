const bcrypt = require("bcryptjs");

const hash = (plainText) => (plainText ? bcrypt.hashSync(plainText, 10) : null);

const verify = (plainText, hashText) => bcrypt.compareSync(plainText, hashText);

module.exports = { hash, verify };
