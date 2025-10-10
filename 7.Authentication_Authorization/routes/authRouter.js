// External Module
const express = require('express');
const authRouter = express.Router();

// local module
const {getLogin, postLogin, postLogout} = require('../controllers/authController');

// routing
authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin);
authRouter.post('/logout', postLogout);

module.exports = authRouter;