const validationSchema = require('./validationSchema')

module.exports.projectValidate = (req,res,next)=>{
    const {error} = validationSchema.projectValidationSchema.validate(req.body);
    let err = {}
    if(!error){
        return next();
    }   
    const path = error.details[0].path[0]
    const message = error.details[0].message
    err[path] = message
    res.status(400).json({err})
}

module.exports.signupValidate = (req,res,next)=>{
    const {error} = validationSchema.signupValidationSchema.validate(req.body);
    let err = {}
    if(!error){
        return next();
    }   
    const path = error.details[0].path[0]
    const message = error.details[0].message
    err[path] = message
    res.status(400).json({err})
}

module.exports.loginValidate = (req,res,next)=>{
    const {error} = validationSchema.loginValidationSchema.validate(req.body);
    let err = {}
    if(!error){
        return next();
    }   
    const path = error.details[0].path[0]
    const message = error.details[0].message
    err[path] = message
    res.status(400).json({err})
}

module.exports.taskValidate = (req,res,next)=>{
    const {error} = validationSchema.taskValidateSchema.validate(req.body);
    let err = {}
    if(!error){
        return next();
    }   
    const path = error.details[0].path[0]
    const message = error.details[0].message
    err[path] = message
    res.status(400).json({err})
}

module.exports.submissionValidate = (req,res,next)=>{
    const {error} = validationSchema.submissionValidateSchema.validate(req.body);
    let err = {}
    if(!error){
        return next();
    }   
    const path = error.details[0].path[0]
    const message = error.details[0].message
    err[path] = message
    res.status(400).json({err})
}