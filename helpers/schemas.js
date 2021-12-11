const Joi = require('joi');

const registrationSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    lastname: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    repeatPassword: Joi.ref('password'),
    birth: Joi.string(),
    country: Joi.string()
        .max(30),
    city: Joi.string()
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2})
        .required()
});

const loginSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2})
        .required()
});

module.exports = {
    registrationSchema,
    loginSchema
}