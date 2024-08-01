const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const {handleError} = require('../middleware/handleError')

const maxAge = 24*60*60
//create JSON web token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWTSECRET, {
        expiresIn: maxAge
    })
}

module.exports.loginform = (req,res)=>{
    res.render('auth/login')
}

module.exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.CompareAndLogin(email,password)
        const token = createToken(user._id);
        res.cookie('jwt',token,{ 
            httpOnly: true,
            maxAge:maxAge*1000 
        })
        res.status(200).json({user:user._id})

    }catch(error){
        const err = handleError(error)
        res.status(400).json({err})
    }
}

module.exports.sigupform = (req,res)=>{
    res.render('auth/signup')
}

module.exports.signup = async(req,res)=>{
    try{
        const {username, password, firstname, lastname, email} = req.body;
        const user = new User({username, password, firstname, lastname, email, role: 'manager'})
        await user.save(); 
        const token = createToken(user.id)
        res.cookie('jwt',token,{ httpOnly: true, maxAge:maxAge*1000 }).status(200).json({user:user._id})
    }catch(error){
        const err = handleError(error)
        res.status(400).json({err})
    }
}

module.exports.logout = (req,res)=>{
    res.cookie('jwt','',{maxAge:'1'})
    res.redirect('/')
}