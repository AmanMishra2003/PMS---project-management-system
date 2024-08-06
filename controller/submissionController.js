const Submission = require('../model/submissionModel')
const Task = require('../model/taskModel')
const { storage, cloudinary } = require('../cloudinary')

//async error handler
const asyncHandler = require('express-async-handler')
const { formatDate } = require('../middleware/dateFormat')
const { populate } = require('dotenv')



module.exports.submissionForm = (req, res) => {
    const { projectId, taskId } = req.params
    res.render('submission/tasksubmissionForm', { projectId, taskId })
}

module.exports.sendSubmissionToDataBase = async (req, res) => {
    try {
        if (req.files.length===0) {
            return res.status(200).json({ err: { 'uploadSubmission': 'Upload pdf or image for submission' } })
        }
        const { projectId, taskId } = req.params
        const task = await Task.findById(taskId)
        const { report } = req.body;
        const submission = new Submission(
            {
                report: report,
            }
        )
        submission.task = taskId;

        //add photos
        if (req.files) {
            req.files.forEach(async (ele) => {
                await submission.uploadSubmission.push({
                    path: ele.path,
                    filename: ele.filename
                })
            })
        }
        submission.author = res.locals.currentUser
        //save submission
        await submission.save();
        await task.save();
        res.status(200).json({ msg: 'done' })
    } catch (err) {
        console.log(err)
        res.status(200).json({ err })
    }
}

module.exports.submissionDetails = asyncHandler(async (req, res) => {
    const { projectId, taskId, id } = req.params;
    const submission = await Submission.findById(id);
    res.render('submission/particularSubmission', { submission, projectId,taskId })
}) 

module.exports.postReviewToDateBase = asyncHandler(async(req,res)=>{
    const {projectId,taskId, id} = req.params;
    const submission = await Submission.findById(id);
    submission.review.push(req.body.review);
    submission.reEvaluation = true;
    await submission.save();
    res.redirect(`/project/${projectId}/tasks/${taskId}`)
})

module.exports.reDoTaskSubmissionForm= asyncHandler(async(req,res)=>{
    const {projectId,taskId, id} = req.params;
    res.render('submission/redoTask.ejs',{projectId, taskId, id})
})

module.exports.reDoTaskSubmissionToDatabase = asyncHandler(async(req,res)=>{
    try {
        if (req.files.length===0) {
            return res.status(200).json({ err: { 'uploadSubmission': 'Upload pdf or image for submission' } })
        }
        const { projectId, taskId ,id} = req.params
        const task = await Task.findById(taskId)
        const { report } = req.body;
        const submission = await Submission.findById(id)

        if(submission.uploadSubmission){
            submission.uploadSubmission.forEach(async(ele)=>{
                await cloudinary.uploader.destroy(ele.filename)
            })
        }

        //add photos
        if (req.files) {
            req.files.forEach(async (ele) => {
                await submission.uploadSubmission.push({
                    path: ele.path,
                    filename: ele.filename
                })
            })
        }
        submission.report = report
        submission.reEvaluation = false
        //save submission
        await submission.save();
        res.status(200).json({ msg: 'done' })
    } catch (err) {
        console.log(err)
        res.status(200).json({ err })
    }
})

