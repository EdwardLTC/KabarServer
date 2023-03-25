'use strict';
const ArticleController = require('../../controllers/api/ArticleController');
const express = require('express'),
    router = express.Router();
const AuthController = require('../../controllers/api/AuthController');

router.get('/search', AuthController.checkLogin, ArticleController.getByTitle);
router.get('/', AuthController.checkLogin, ArticleController.getAll);
router.get('/:id/detail', AuthController.checkLogin, ArticleController.getById);
router.get('/my-articles', AuthController.checkLogin, ArticleController.getByAuthor);

router.post('/', AuthController.checkLogin, ArticleController.insert);

router.put('/:id/update', AuthController.checkLogin, ArticleController.update);

router.delete('/:id/delete', AuthController.checkLogin, ArticleController.delete);






module.exports = router;
