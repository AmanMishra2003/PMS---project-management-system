const projectController = require('../controller/projectController')
const express = require('express')
const router = express.Router()

//model
const Project = require('../model/projectModel')

router.route('/')
    .get((req,res)=>{
        res.send('project route')
    })

module.exports = router;