const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//schema
const userSchema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: 'string',
        required: true,
        minlength: 8,
    },
});

//Hashing password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;