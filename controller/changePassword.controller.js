const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

// Router
const changeRouter = require("express").Router();

// Change Password
changeRouter.patch('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: 'Password changed successfully',
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

module.exports = changeRouter;
