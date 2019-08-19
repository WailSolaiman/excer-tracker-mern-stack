const Joi = require('@hapi/joi')

const registerValidation = data => {
    const schema = {
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(30)
            .required(),
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2 }),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
    }
    return Joi.validate(data, schema)
}

const loginValidation = data => {
    const schema = {
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2 }),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
    }
    return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
