const mongoose = require('mongoose')

const Users = mongoose.model('Users', {
    name_user: String,
    pass_user: String,
    email_user: String,
    adm_user: Boolean,
})

module.exports = Users