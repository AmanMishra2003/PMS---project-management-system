const mongoose  = require('mongoose')
const Schema = mongoose.Schema


const ImageSchema = require('./imageSchema')
const Submission = require('./submissionModel')
const { cloudinary } = require('../cloudinary')

const TaskSchema = Schema({
    taskName:{
        type : String,
        required : [true, "Task's name is required!"],
        lowercase : true,
    },
    description : {
        type:String,
        required : [true, "Task's Description is required!"],
        lowercase : true
    },
    dateAdded :{
        type :Date,
        default : Date.now()
    },
    deadline : {
        type :Date,
        required : [true, 'Deadline is rqeuired']
    },
    assignTo : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    project : {
        type : Schema.Types.ObjectId,
        ref : 'Project'
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    completed :{
        type : Boolean,
        default : false
    },
    image :[ImageSchema]
})

TaskSchema.post('findOneAndDelete',async(task)=>{
    if(task){
        const submission = await Submission.findOne({task : task._id})
        await cloudinary.uploader.destroy(submission.uploadSubmission.filename)
        await submission.delete();
    }
})

module.exports = mongoose.model('Task', TaskSchema)