'use strict';
const MediaController = require( '../../controllers/MediaController' );
const express = require( 'express' ),
    router = express.Router();
const multer  = require('multer');

router.post( '/upload', [MediaController.upload.single('image')], MediaController.insert );




module.exports = router;
