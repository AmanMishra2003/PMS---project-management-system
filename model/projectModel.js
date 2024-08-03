const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = require('./imageSchema')

const ProjectSchema = Schema({
    projectName :{
        type: String,
        required : [true,'Project Name is required'],
        lowercase : true,
        unique:true 
    },
    publishDate :{
        type: Date,
    },
    description : {
        type: String,
        required : [true,'Project Name is required'],
    },
    image :[ImageSchema],
    task : [
        {
            type : Schema.Types.ObjectId,
            ref :'Task'
        }
    ],
    workingMembers :[
        {
            type : Schema.Types.ObjectId,
            ref :'User'
        }
    ],
    author :{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Project', ProjectSchema)