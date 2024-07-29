const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
    Desciption : {
        type: String,
        required : [true,'Project Name is required'],
        lowercase : true,
    },
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
    Author :{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Project', ProjectSchema)