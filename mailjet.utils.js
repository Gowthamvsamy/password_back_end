const Mailjet = require('node-mailjet');
require('dotenv').config();

const mailjet = Mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);

function sendOTP(email, otp) {
    const request = mailjet.post("send", { 'version': 'v3.1' }).request({
        Messages: [
            {
                From: { Email: "gowtham.gv197@gmail.com", Name: "Password Reset" },
                To: [{ Email: email }],
                Subject: "Your OTP for Password Reset",
                TextPart: `Your OTP for password reset is ${otp}`,
                HTMLPart: `<p>Your OTP for password reset is <strong>${otp}</strong></p>`,
            }
        ]
    });

    return request;
}

module.exports = { sendOTP };
