'use strict';
const AuthController = require('../../controllers/AuthController');
const express = require('express'),
    router = express.Router();

router.post('/login', AuthController.login);

router.get('/logout', AuthController.checkLogin, AuthController.logout);

router.get('/login', (req, res) => {
    res.render('login');
});




module.exports = router;
