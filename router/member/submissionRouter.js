const express = require('express');
const router = express.Router({mergeParams:true})

const {storageRawFiles} = require('../../cloudinary')
const {submissionValidate} = require('../../joi/validate')
const {AuthorizeMember, AuthorizeManager,submissionUserAuthorization} = require('../../middleware/middleware')

//image handling middleware
const multer = require('multer')
const upload = multer({storage:storageRawFiles})

//submission Controller
const submissionController = require('../../controller/submissionController')
router.route('/')
    .get(
        AuthorizeMember,
        submissionUserAuthorization,
        submissionController.submissionForm
    )
    .post(
        AuthorizeMember,
        submissionUserAuthorization,
        upload.single('submission'),
        submissionValidate,
        submissionController.sendSubmissionToDataBase
    )

router.route('/:id')
    .get(
        AuthorizeManager,
        submissionController.submissionDetails
    )
    .post(
        AuthorizeManager,
        submissionController.postReviewToDateBase
    )
    .patch(
        AuthorizeMember,
        submissionUserAuthorization,
        upload.single('submission'),
        submissionValidate,
        submissionController.reDoTaskSubmissionToDatabase
    )

router.route('/:id/redo')
    .get(
        AuthorizeMember,
        submissionUserAuthorization,
        submissionController.reDoTaskSubmissionForm
    )
    



    

module.exports = router;