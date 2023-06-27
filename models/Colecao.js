const mongoose = require('mongoose')

const Colecao = mongoose.model('Colecao', {
    name_colecao: String,
    img_colecao: String, 
})

module.exports = Colecao