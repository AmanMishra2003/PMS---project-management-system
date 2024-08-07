const mongoose = require('mongoose')

//model
const Task = require('./taskModel')
const Submission = require('./submissionModel')

const argon2 = require('argon2');
const Schema = mongoose.Schema
// const opts = {toJSON :{virtuals:true}} //this virtuals : true indicate that virtual property should be included in the output

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
        index : true,
        lowercase :true
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
    },
    manager : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    member :[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

UserSchema.virtual('fullname').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await argon2.hash(this.password);
    next();
})

UserSchema.statics.CompareAndLogin = async function(email,password){
    const user = await this.findOne({email})
    if(!user){
        throw Error('User does not exist')
    }
    const verify = await argon2.verify(user.password, password)
    if(!verify){
        throw Error('Incorrect Password!')
    }
    return user;
}

UserSchema.post('findOneAndDelete',async(user)=>{
    if(user){
        //if find task with id of deleted member this will change assignTo none
        const tasks = await Task.find({assignTo : user._id});
        tasks.forEach(async(ele)=>{
            ele.assignTo = null
            await ele.save();
        })

        //if find submission with id of deleted member this will delete the submission
        await Submission.deleteMany({
            author : user._id
        })

    }
})


module.exports = mongoose.model('User', UserSchema)