const User = require('../models/user.model');
const { sendOTP } = require('../mailjet.utils');

//Route
const forgotRouter = require("express").Router();

// Temporary storage for OTPs
const otpStore = new Map();

// send OTP to the email
forgotRouter.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        //get data from server
        const user = await User.findOne({ email });

        //Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            })
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP with expiry (5 minutes)
        otpStore.set(otp, { email, expiresAt: Date.now() + 5 * 60 * 1000 });

        // Send OTP via email
        await sendOTP(email, otp);

        res.status(200).json({
            message: "OTP sent to email",
            success: true,
            data: otp
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            error: err.message,
        });
    }
})

// Validate OTP
forgotRouter.post('/validate', (req, res) => {
    try {
        const { otp } = req.body;

        // Check OTP are provided
        if (!otp) {
            return res.status(400).json({ message: "OTP is required" });
        }

        // Retrieve stored data for the OTP
        const storedOtpData = otpStore.get(otp);

        // Check if OTP exists and is still valid
        if (!storedOtpData) {
            return res.status(401).json({ message: "OTP not found or expired" });
        }

        const { expiresAt } = storedOtpData;

        // Check if OTP is expired
        if (Date.now() > expiresAt) {
            otpStore.delete(otp); // Remove expired OTP
            return res.status(401).json({ message: "OTP expired" });
        }

        // OTP is valid
        otpStore.delete(otp); // Optionally delete OTP after successful validation

        return res.status(200).json({
            message: "OTP validated successfully",
            success: true,
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            error: err.message,
        });
    }
});

module.exports = forgotRouter;