'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var AuthController = require('../controllers/auth')
const auth = require('../middlewares/auth');
var router = express.Router();

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.get('/getuser', auth.isAuth, UserController.getUser);
router.get('/verificatoken', auth.isAuth, (req, res) => {
    res.status(200).send({verification: true, user: req.user ,message: 'Tienes acceso'})});

module.exports = router;