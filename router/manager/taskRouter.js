const taskController = require('../../controller/taskController')
const express = require('express')
const router = express.Router({mergeParams:true})

const {storage} = require('../../cloudinary')
const {taskValidate} = require('../../joi/validate')

//multer middleware 
const multer = require('multer')
const upload = multer({storage : storage})

//model
const Task = require('../../model/taskModel');

router.route('/')
    .get(
        taskController.tasks
    )   
    .post(
        upload.array('task'),
        taskValidate,
        taskController.addTaskToDatabase
    )

router.route('/assign')
    .get(
        taskController.assignTaskPage
    )   

router.route('/:id')
    .get(
        taskController.singleTaskPage
    )
    .patch(
        upload.array('task'),
        taskValidate,
        taskController.editTask
    )
    .delete(
        taskController.deleteTask
    )

router.route('/:id/edit')
    .get(
        taskController.editTaskForm
    )




module.exports = router;