const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.post('/forgot-password', authController.forgotPassword);
Router.patch('/reset-password/:token', authController.resetPassword);

Router.route('/').get(userController.getAllUsers);

module.exports = Router;
