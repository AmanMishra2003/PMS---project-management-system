const mongoose = require('mongoose')
const {isEmail} = require('validator')
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



module.exports = mongoose.model('User', UserSchema)