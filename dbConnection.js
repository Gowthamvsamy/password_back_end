const mongoose = require('mongoose');
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function createDbConnection() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('connected to mongoDB successfully');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { createDbConnection };