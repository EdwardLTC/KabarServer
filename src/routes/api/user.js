'use strict';
const UserController = require( '../../controllers/api/UserController' );
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../../controllers/api/AuthController' );

router.post( '/register', UserController.register );

router.post( '/change-password', AuthController.checkLogin, UserController.changePassword );

router.post( '/update-profile', AuthController.checkLogin, UserController.updateProfile );



module.exports = router;
