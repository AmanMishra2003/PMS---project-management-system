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
        if (!req.file) {
            return res.status(200).json({ err: { 'uploadSubmission': 'Upload pdf for submission' } })
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
        if (req.file) {
                submission.uploadSubmission = {
                    path: req.file.path,
                    filename: req.file.filename
                }
        }
        submission.author = res.locals.currentUser
        //save submission
        task.completed = true;
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
    const submission = await Submission.findById(id).populate('task');
    submission.review.push(req.body.review);
    submission.reEvaluation = true;
    submission.task.completed = false;
    await submission.task.save();
    await submission.save();
    res.redirect(`/project/${projectId}/tasks/${taskId}`)
})

module.exports.reDoTaskSubmissionForm= asyncHandler(async(req,res)=>{
    const {projectId,taskId, id} = req.params;
    res.render('submission/redoTask.ejs',{projectId, taskId, id})
})

module.exports.reDoTaskSubmissionToDatabase = asyncHandler(async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(200).json({ err: { 'uploadSubmission': 'Upload pdf for submission' } })
        }
        const {id} = req.params
        const { report } = req.body;
        const submission = await Submission.findById(id).populate('task')

        if(submission.uploadSubmission){
           await cloudinary.uploader.destroy(submission.uploadSubmission.filename)
        }

        //add photos
        if (req.file) {
            submission.uploadSubmission = {
                path: req.file.path,
                filename: req.file.filename
            }
        }   
        submission.report = report
        submission.reEvaluation = false
        submission.task.completed=true;
        //save submission
        await submission.task.save();
        await submission.save();
        res.status(200).json({ msg: 'done' })
    } catch (err) {
        console.log(err)
        res.status(200).json({ err })
    }
})

