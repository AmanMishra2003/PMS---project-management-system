const projectController = require('../controller/projectController')
const express = require('express')
const router = express.Router()

//model
const Project = require('../model/projectModel')

router.route('/')
    .get((req,res)=>{
        res.render('project/projectHome')
    })

module.exports = router;