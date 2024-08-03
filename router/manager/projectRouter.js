const projectController = require('../../controller/projectController')
const express = require('express')
const router = express.Router()

const {storage} = require('../../cloudinary')

//model
const Project = require('../../model/projectModel')
const {AuthorizeMiddleware,AuthorizeManager} = require('../../middleware/middleware')

//validation middleware
const {projectValidate} = require('../../joi/validate')

//multer middleware 
const multer = require('multer')
const upload = multer({storage : storage})

router.route('/')
    .get( 
        AuthorizeMiddleware, 
        projectController.projectPage
    )
    .post(
        AuthorizeMiddleware,
        AuthorizeManager,
        upload.array('image'), 
        projectValidate, 
        projectController.addProjectToDatabase
    )

router.route('/new')
    .get(
        AuthorizeMiddleware,
        AuthorizeManager,
        projectController.addProjectForm
    )

router.route('/:id')
    .get(
        AuthorizeMiddleware,
        projectController.individualProject
    )
    .patch( 
        AuthorizeMiddleware,
        AuthorizeManager,
        upload.array('image'),
        projectValidate,
        projectController.editProjectToDatabase
    )
    .delete(
        AuthorizeMiddleware,
        AuthorizeManager,
        projectController.deleteProject
    )

router.route('/:id/edit')
    .get(
        AuthorizeMiddleware,
        AuthorizeManager,
        projectController.editProjectForm
    )


module.exports = router;


