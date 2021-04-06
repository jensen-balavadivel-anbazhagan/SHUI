const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    generateToken(data) {
        return jwt.sign({ uuid: data.uuid }, process.env.SECRET_KEY, {
            expiresIn: 600 
        })
    }
}