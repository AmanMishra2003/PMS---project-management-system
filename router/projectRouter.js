const projectController = require('../controller/projectController')
const express = require('express')
const router = express.Router()

//model
const Project = require('../model/projectModel')
const {AuthorizeMiddleware} = require('../middleware/middleware')

//validation middleware
const {projectValidate} = require('../joi/validate')

router.route('/')
    .get(AuthorizeMiddleware,projectController.projectPage)
    .post(projectValidate,projectController.addProjectToDatabase)

router.route('/new')
    .get(projectController.addProjectForm)

router.route('/:id')
    .get(projectController.individualProject)
    .patch(projectValidate,projectController.editProjectToDatabase)
    .delete(projectController.deleteProject)

router.route('/:id/edit')
    .get(projectController.editProjectForm)

module.exports = router;


// routes we need 
// get (/project) //all project
// post (/project) //add database route

// get (/project/new ) //  addnew form

// get (/project/:id) //individual route
// patch (/project/:id) //edit project form
// delete (/project/:id) //delete complete project

// get (/project/:id/edit) //get edit form

