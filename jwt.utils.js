const jwt = require('jsonwebtoken');
require("dotenv").config();

const SECRET_KEY = process.env.JWT_TOKEN;

function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '1h',
    });
    return token;
}

module.exports = { generateToken };