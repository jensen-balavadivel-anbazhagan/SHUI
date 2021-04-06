const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

module.exports = {
    textcryptr(description) {
        const encryptedString =  cryptr.encrypt(description);
        const stringFormat = String(encryptedString)
        return stringFormat
    },

    convertToText(encryptedString) {
        const description = cryptr.decrypt(encryptedString);
        return description
    }

}