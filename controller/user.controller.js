const userModel = require('../models/user.model');

//Router
const userRouter = require("express").Router();

//Register user

userRouter.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new userModel({ username, email, password });
        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            data: newUser
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({
            message: 'Error registering user',
            error: err.message
        });
    }
});

//exports
module.exports = userRouter;