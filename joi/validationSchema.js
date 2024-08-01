const Project = require('../model/projectModel')
const Joi = require('joi')

module.exports.projectValidationSchema = Joi.object({
    projectName: Joi.string().required().messages({
        'any.required': `Project Name is a required field`,
        'string.empty': `Project Name cannot be empty`
    }),
    image: Joi.string(),
    description: Joi.string().required().messages({
        'any.required': `Description is a required field`,
        'string.empty': `Description cannot be empty`
    })
})

module.exports.signupValidationSchema = Joi.object({
    username : Joi.string().required().messages({
        'any.required': `username is a required field`,
        'string.empty': `username cannot be empty`
    }),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'any.required': `email is a required field`,
        'string.empty': `email cannot be empty`
    }),
    firstname : Joi.string().required().messages({
        'any.required': `firstname is a required field`,
        'string.empty': `firstname cannot be empty`
    }),
    lastname : Joi.string().required().messages({
        'any.required': `lastname is a required field`,
        'string.empty': `lastname cannot be empty`
    }),
    password : Joi.string().min(8).required().messages({
        'any.required': `Password is a required field`,
        'string.empty': `Password cannot be empty`
    }),
})

module.exports.loginValidationSchema = Joi.object({
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'any.required': `email is a required field`,
        'string.empty': `email cannot be empty`
    }),
    password : Joi.string().min(8).required().messages({
        'any.required': `Password is a required field`,
        'string.empty': `Password cannot be empty`
    })
})