// External Module
const express = require('express');
const authRouter = express.Router();

// local module
const {getLogin, postLogin} = require('../controllers/authController');

// routing
authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin);

module.exports = authRouter;