const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()

//validate
const {signupValidate,loginValidate} = require('../joi/validate')

//models
const User = require('../model/userModel')

router.route('/login')
    .get(userController.loginform)
    .post(loginValidate, userController.login)

router.route('/signup')
    .get(userController.sigupform)
    .post(signupValidate,userController.signup)

router.route('/logout')
    .get(userController.logout)


module.exports = router;