'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var AuthController = require('../controllers/auth')
const auth = require('../middlewares/auth');
var router = express.Router();

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/save-user', UserController.saveUser);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.get('/private', auth.isAuth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso'})
});

module.exports = router;