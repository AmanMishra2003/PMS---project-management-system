const express = require('express');
const router = express.Router({mergeParams:true})

const {storage} = require('../../cloudinary')
const {submissionValidate} = require('../../joi/validate')

//image handling middleware
const multer = require('multer')
const upload = multer({storage:storage})

//submission Controller
const submissionController = require('../../controller/submissionController')
router.route('/')
    .get(
        submissionController.submissionForm
    )
    .post(
        upload.array('submission'),
        submissionValidate,
        submissionController.sendSubmissionToDataBase
    )

router.route('/:id')
    .get(
        submissionController.submissionDetails
    )
    .post(
        submissionController.postReviewToDateBase
    )
    .patch(
        upload.array('submission'),
        submissionValidate,
        submissionController.reDoTaskSubmissionToDatabase
    )

router.route('/:id/redo')
    .get(
        submissionController.reDoTaskSubmissionForm
    )
    



    

module.exports = router;