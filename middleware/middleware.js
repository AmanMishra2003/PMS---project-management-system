//module
const jwt = require('jsonwebtoken');

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
