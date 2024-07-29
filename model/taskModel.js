const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = Schema({
    TaskName:{
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
    }
})

module.exports = mongoose.model('Task', TaskSchema)