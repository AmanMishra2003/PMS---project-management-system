//module
const jwt = require('jsonwebtoken');
const Project = require('../model/projectModel')
const Task = require('../model/taskModel')
const Submission = require('../model/submissionModel')
const asyncHandler = require('express-async-handler')

//model
const User = require('../model/userModel')

module.exports.checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        res.locals.currentUser = null;
        // return next();
    }

    jwt.verify(token, process.env.JWTSECRET,async(err,decoded)=>{
        if(err){
            res.locals.currentUser = null;
            return next()
        }
        if(decoded){
            const user = await User.findById(decoded.id)
            if(user){
                res.locals.currentUser = user
                return next()
            }else{
                res.locals.currentUser = null;
                next()
            }
        }
    })
}


module.exports.AuthorizeMiddleware = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token){
       return res.redirect('/user/login')
    }

    jwt.verify(token, process.env.JWTSECRET,(err)=>{
        if(err){
            console.log(err)
        }else{
            next()
        }
    })
}

module.exports.AuthorizeManager = (req,res,next)=>{
    if(res.locals.currentUser.role!='manager'){
        return res.redirect('/')
    }
    next()
}

module.exports.AuthorizeMember = (req,res,next)=>{
    if(res.locals.currentUser.role!='teammember'){
        return res.redirect('/')
    }
    next()
}

module.exports.projectAuthorCheck = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const project = await Project.findById(id);
    if(project.author.equals(res.locals.currentUser._id)){
        return next()
    }
    res.redirect('/project')
})

module.exports.taskAuthorCheck = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    if(task.author.equals(res.locals.currentUser._id)){
        return next()
    }
    res.redirect('/project')
})

module.exports.submissionUserAuthorization = asyncHandler(async(req,res,next)=>{
    const {taskId} = req.params;
    const task = await Submission.findById(taskId);
    if(task.assign.equals(res.locals.currentUser._id)){
        return next()
    }
    res.redirect('/project')
})

