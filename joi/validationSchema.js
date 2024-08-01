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