const Joi = require('joi')

module.exports = {
    name_user: Joi.string().min(3).required(),
    pass_user: Joi.string().min(4).required(),
    email_user: Joi.string().email().required()
}