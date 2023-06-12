const mongoose = require('mongoose')

const Avaliacao = mongoose.model('Avaliacao', {
    name_avaliacao: String,
    mensagem_avaliacao: String,
    jogo_avaliacao: String,
})

module.exports = Avaliacao