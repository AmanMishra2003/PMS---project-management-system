const { now } = require('mongoose')
const Project = require('../model/projectModel')
const Joi = require('joi')

module.exports.projectValidationSchema = Joi.object({
    projectName: Joi.string().required().messages({
        'any.required': `Project Name is a required field`,
        'string.empty': `Project Name cannot be empty`
    }),
    image: Joi.object(),
    description: Joi.string().required().messages({
        'any.required': `Description is a required field`,
        'string.empty': `Description cannot be empty`
    }),
    deleteImages : Joi.array()

    //can user joi alternatives if u want choice between schema datatype
    // deleteImages : Joi.alternatives().try(
    //     Joi.array(),
    //     Joi.string()
    // )
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

module.exports.taskValidateSchema = Joi.object({
    taskName : Joi.string().required().messages({
        'any.required': `Task Name is a required field`,
        'string.empty': `Task Name cannot be empty`
    }),
    description : Joi.string().required().messages({
        'any.required': `Description is a required field`,
        'string.empty': `Description cannot be empty`
    }),
    deadline : Joi.date().greater('now').required(),
    assignTo : Joi.string().required().messages({
        'any.required': `Select a member`,
        'string.empty': `Select a member`
    }),
    deleteImages : Joi.array()
})

module.exports.submissionValidateSchema = Joi.object({
    uploadSubmission : Joi.object(),
    // uploadSubmission : Joi.object().required().messages({
    //     'any.required': `Upload is a required field`,
    //     'string.empty': `Task Name cannot be empty`
    // }),
    report : Joi.string().required().messages({
        'any.required': `Report is a required field`,
        'string.empty': `Report cannot be empty`
    })
})