const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()

//models
const User = require('../model/userModel')

router.route('/')
    .get((req,res)=>{
        res.send('user route')
    })

module.exports = router;