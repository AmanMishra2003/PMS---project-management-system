const taskController = require('../controller/taskController')
const express = require('express')
const router = express.Router()

//model
const Task = require('../model/taskModel');

router.route('/')
    .get((req,res)=>{
        res.send('task route')
    })

module.exports = router;