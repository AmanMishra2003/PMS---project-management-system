const mongoose = require('mongoose');
const Schema = mongoose.Schema

//image Schema
const ImageSchema = require('./imageSchema')

const submissionSchema = Schema({
    uploadSubmission : [
        ImageSchema
    ],
    report :{
        type : String,
        required : true,
    },
    accepted : {
        type : Boolean,
        default : false
    },
    submissionDate :{
        type  : Date,
        default : Date.now()
    },
    review :[
        {
            type: String
        }
    ],
    task :{
        type : Schema.Types.ObjectId,
        ref : 'Task'
    },
    author:{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    reEvaluation :{
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Submission',submissionSchema)