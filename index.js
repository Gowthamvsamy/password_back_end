//import
const express = require('express');
const { createDbConnection } = require('./dbConnection');
const registerController = require('./controller/user.controller');
const loginController = require('./controller/login.controller');
const cors = require('cors');
const mongoose = require('mongoose');
const forgotController = require('./controller/forgotPassword.controller');
const changeController = require('./controller/changePassword.controller');


// Create a database connection
createDbConnection()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


//create express API_SERVER
const API_SERVER = express();

//passing incoming request body as a json
API_SERVER.use(cors());
API_SERVER.use(express.json());

//controllers injections
API_SERVER.get('/', function (req, res) {
    return res.status(200).json({
        message: 'Welcome to password reset flow',
    });
});
API_SERVER.use('/register', registerController);
API_SERVER.use('/login', loginController);
API_SERVER.use('/emailVerification', forgotController)
API_SERVER.use('/changepassword', changeController)

//start and listen to the server
API_SERVER.listen(3000, 'localhost', () => {
    console.log('Server started on port 3000');
    console.log("http://localhost:3000");
});

