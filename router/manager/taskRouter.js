const taskController = require('../../controller/taskController')
const express = require('express')
const router = express.Router({mergeParams:true})

const {storage} = require('../../cloudinary')
const {taskValidate} = require('../../joi/validate')
const {taskAuthorCheck,AuthorizeManager,checkManagerHaveTeamMembers} = require('../../middleware/middleware')

//multer middleware 
const multer = require('multer')
const upload = multer({storage : storage})


router.route('/')
    .post(
        AuthorizeManager,
        upload.array('task'),
        taskValidate,
        taskController.addTaskToDatabase
    )

router.route('/assign')
    .get(
        AuthorizeManager,
        checkManagerHaveTeamMembers,
        taskController.assignTaskPage
    )   

router.route('/:id')
    .get(
        taskController.singleTaskPage
    )
    .patch(
        AuthorizeManager,
        taskAuthorCheck,
        upload.array('task'),
        taskValidate,
        taskController.editTask
    )
    .delete(
        AuthorizeManager,
        taskAuthorCheck,
        taskController.deleteTask
    )

router.route('/:id/edit')
    .get(
        AuthorizeManager,
        taskAuthorCheck,
        checkManagerHaveTeamMembers,
        taskController.editTaskForm
    )




module.exports = router;