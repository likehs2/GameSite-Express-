const routerAvaliacao = require('express').Router()
const Avaliacao = require('../models/Avaliacao')

routerAvaliacao.post('/', async (req, res) =>{
    const {name_avaliacao, mensagem_avaliacao, jogo_avaliacao} = req.body

    const avaliacao = {
        name_avaliacao,
        mensagem_avaliacao,
        jogo_avaliacao,
        
    }

    try{
        await Avaliacao.create(avaliacao)

        res.status(201).redirect('/cards')

    }catch (error) {
        res.status(500).json({error: error})
    }
})

routerAvaliacao.get('/', async (req, res) =>{
    try {
        const avaliacao = await Avaliacao.find()

        res.status(200).json(avaliacao)

    } catch (error) {
        res.status(500).json({ error: error})
    }
})

routerAvaliacao.get('/avalia/:nome', async (req, res) =>{
    const nome = req.params.nome
    try {
        const avaliacao = await Avaliacao.find({ jogo_avaliacao: nome })

        res.status(200).json(avaliacao)

    } catch (error) {
        res.status(500).json({ error: error})
    }
})

routerAvaliacao.get('/:nome', async (req, res) =>{
    const nome = req.params.nome

    try {
        const avaliacao = await Avaliacao.findOne({ jogo_avaliacao: nome })

        if(!avaliacao) {
            res.status(422).json({ message: 'Avaliacao não encontrado!'})
            return
        }
        res.status(200).json(avaliacao)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

routerAvaliacao.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {mensagem_avaliacao} = req.body


    const avaliacao = {
        mensagem_avaliacao,
    }

    try {
        const updateAvaliacao = await Avaliacao.updateOne({ _id: id })

        res.status(200).json(updateAvaliacao)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

routerAvaliacao.post('/atualiza/:id', async (req, res) =>{
    const id = req.params.id
    const {mensagem_avaliacao} = req.body


    const avaliacao = {
        mensagem_avaliacao,
    }

    try {
        const updateAvaliacao = await Avaliacao.updateOne({ _id: id }, avaliacao)

        res.status(200).redirect("/cards")
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

routerAvaliacao.delete('/:id', async (req, res) =>{
    const id = req.params.id

    const avaliacao = await Avaliacao.findOne({ _id: id })
    if(!avaliacao){
        res.status(422).json({ message: 'avaliacao não encontrado!' })
        return
    }

    try{
        await Avaliacao.deleteOne({_id: id})

        res.status(200).json({ message: 'avaliacao removido com sucesso' })
    }catch(error){
        res.status(500).json({ error: error })
    }

})
routerAvaliacao.get('/deletar/:id', async (req, res) =>{
    const id = req.params.id

    const avaliacao = await Avaliacao.findOne({ _id: id })
    if(!avaliacao){
        res.status(422).json({ message: 'avaliacao não encontrado!' })
        return
    }

    try{
        await Avaliacao.deleteOne({_id: id})

        res.status(200).redirect("/cards")
    }catch(error){
        res.status(500).json({ error: error })
    }

})
module.exports = routerAvaliacao