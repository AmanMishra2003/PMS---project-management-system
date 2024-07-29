const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema

const UserSchema = Schema({
    username : {
        type : String,
        required : [true, 'Username is required'],
        unique : true,
        index : true,
        lowercase : true
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        index : true
    },
    firstname :{
        type: String,
        required : [true, 'Firstname is required'],
        lowercase : true
    },
    lastname : {
        type: String,
        required : [true, 'Lastname is required'],
        lowercase : true
    },
    password : {
        type: String,
        required : [true, 'Password is required'],
        minlength : [8, 'Password should contain more than 8 letter']
    },
    role : {
        type: String,
        required : [true, 'Role is required'],
        enum : {
            values : ['manager', 'teammember'],
            message :'enum validator failed for path `{PATH}` with value `{VALUE}`'
        },
        lowercase : true
    }
})

module.exports = mongoose.model('User', UserSchema)