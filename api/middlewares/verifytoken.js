const jwt = require('jsonwebtoken');
const { generateToken } = require('../models/token')
require('dotenv').config();
const db = require('../dataBase/db');

module.exports = {
    async authorize(req, res, next) {
        const bearerHeader = req.header('authorization').replace('Bearer ', '');
        if (typeof bearerHeader !== undefined) {
            const data = jwt.verify(bearerHeader, process.env.SECRET_KEY)
            const user = await db.findUserByuuid(data.uuid);
            req.token = generateToken(user)
            req.user = user;
            next()
        } else {
            res.status(401).send(JSON.stringify({
                sucess: false,
                error: 'not a valid token'
            }))
        }
    }
};
