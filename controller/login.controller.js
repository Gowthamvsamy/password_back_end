// import
const { generateToken } = require('../jwt.utils');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

//Router
const loginRouter = require("express").Router();

//Login requires
loginRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        //get data from server
        const user = await User.findOne({ email });


        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // Generate token
            const token = generateToken({ id: user._id, username: user.username });

            return res.status(200).json({
                token: token,
                message: 'User logged in successfully',
            });
        } else {
            return res.status(401).json({
                message: 'Invalid credentials',

            });
        }

    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            error: err.message,
        });
    }

});

module.exports = loginRouter;
