const projectController = require('../../controller/projectController')
const express = require('express')
const router = express.Router()

const {storage} = require('../../cloudinary')

//model
const Project = require('../../model/projectModel')
const {AuthorizeManager, projectAuthorCheck} = require('../../middleware/middleware')

//validation middleware
const {projectValidate} = require('../../joi/validate')

//multer middleware 
const multer = require('multer')
const upload = multer({storage : storage})

router.route('/')
    .get( 
        projectController.projectPage
    )
    .post(
        AuthorizeManager,
        upload.array('image'), 
        projectValidate, 
        projectController.addProjectToDatabase
    )

router.route('/new')
    .get(
        AuthorizeManager,
        projectController.addProjectForm
    )

router.route('/:id')
    .get(
        projectController.individualProject
    )
    .patch( 
        AuthorizeManager,
        projectAuthorCheck,
        upload.array('image'),
        projectValidate,
        projectController.editProjectToDatabase
    )
    .delete(
        AuthorizeManager,
        projectAuthorCheck,
        projectController.deleteProject
    )

router.route('/:id/edit')
    .get(
        AuthorizeManager,
        projectAuthorCheck,
        projectController.editProjectForm
    )


module.exports = router;


