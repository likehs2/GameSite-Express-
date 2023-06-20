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


routerAvaliacao.post('/CarregarDados', async (req, res) =>{

    const avaliacao1Jogo1 = {
        name_avaliacao: "avaliador1",
        mensagem_avaliacao: "Primeira avaliação",
        jogo_avaliacao: "jogo1",
        
    }
    const avaliacao2Jogo1 = {
        name_avaliacao: "avaliador2",
        mensagem_avaliacao: "Segunda avaliação",
        jogo_avaliacao: "jogo1",
        
    }
    const avaliacao3Jogo1 = {
        name_avaliacao: "avaliador3",
        mensagem_avaliacao: "Terceira avaliação",
        jogo_avaliacao: "jogo1",
        
    }
    const avaliacao4Jogo1 = {
        name_avaliacao: "avaliador4",
        mensagem_avaliacao: "Quarta avaliação",
        jogo_avaliacao: "jogo1",
        
    }
    const avaliacao5Jogo1 = {
        name_avaliacao: "avaliador5",
        mensagem_avaliacao: "Quinta avaliação",
        jogo_avaliacao: "jogo1",
        
    }

    const avaliacao1Jogo2 = {
        name_avaliacao: "avaliador1",
        mensagem_avaliacao: "Primeira avaliação",
        jogo_avaliacao: "jogo2",
        
    }
    const avaliacao2Jogo2 = {
        name_avaliacao: "avaliador2",
        mensagem_avaliacao: "Segunda avaliação",
        jogo_avaliacao: "jogo2",
        
    }
    const avaliacao3Jogo2 = {
        name_avaliacao: "avaliador3",
        mensagem_avaliacao: "Terceira avaliação",
        jogo_avaliacao: "jogo2",
        
    }
    const avaliacao4Jogo2 = {
        name_avaliacao: "avaliador4",
        mensagem_avaliacao: "Quarta avaliação",
        jogo_avaliacao: "jogo2",
        
    }
    const avaliacao5Jogo2 = {
        name_avaliacao: "avaliador5",
        mensagem_avaliacao: "Quinta avaliação",
        jogo_avaliacao: "jogo2",
        
    }

    const avaliacao1Jogo3 = {
        name_avaliacao: "avaliador1",
        mensagem_avaliacao: "Primeira avaliação",
        jogo_avaliacao: "jogo3",
        
    }
    const avaliacao2Jogo3 = {
        name_avaliacao: "avaliador2",
        mensagem_avaliacao: "Segunda avaliação",
        jogo_avaliacao: "jogo3",
        
    }
    const avaliacao3Jogo3 = {
        name_avaliacao: "avaliador3",
        mensagem_avaliacao: "Terceira avaliação",
        jogo_avaliacao: "jogo3",
        
    }
    const avaliacao4Jogo3 = {
        name_avaliacao: "avaliador4",
        mensagem_avaliacao: "Quarta avaliação",
        jogo_avaliacao: "jogo3",
        
    }
    const avaliacao5Jogo3 = {
        name_avaliacao: "avaliador5",
        mensagem_avaliacao: "Quinta avaliação",
        jogo_avaliacao: "jogo3",
        
    }

    const avaliacao1Jogo4 = {
        name_avaliacao: "avaliador1",
        mensagem_avaliacao: "Primeira avaliação",
        jogo_avaliacao: "jogo4",
        
    }
    const avaliacao2Jogo4 = {
        name_avaliacao: "avaliador2",
        mensagem_avaliacao: "Segunda avaliação",
        jogo_avaliacao: "jogo4",
        
    }
    const avaliacao3Jogo4 = {
        name_avaliacao: "avaliador3",
        mensagem_avaliacao: "Terceira avaliação",
        jogo_avaliacao: "jogo4",
        
    }
    const avaliacao4Jogo4 = {
        name_avaliacao: "avaliador4",
        mensagem_avaliacao: "Quarta avaliação",
        jogo_avaliacao: "jogo4",
        
    }
    const avaliacao5Jogo4 = {
        name_avaliacao: "avaliador5",
        mensagem_avaliacao: "Quinta avaliação",
        jogo_avaliacao: "jogo4",
        
    }

    const avaliacao1Jogo5 = {
        name_avaliacao: "avaliador1",
        mensagem_avaliacao: "Primeira avaliação",
        jogo_avaliacao: "jogo5",
        
    }
    const avaliacao2Jogo5 = {
        name_avaliacao: "avaliador2",
        mensagem_avaliacao: "Segunda avaliação",
        jogo_avaliacao: "jogo5",
        
    }
    const avaliacao3Jogo5 = {
        name_avaliacao: "avaliador3",
        mensagem_avaliacao: "Terceira avaliação",
        jogo_avaliacao: "jogo5",
        
    }
    const avaliacao4Jogo5 = {
        name_avaliacao: "avaliador4",
        mensagem_avaliacao: "Quarta avaliação",
        jogo_avaliacao: "jogo5",
        
    }
    const avaliacao5Jogo5 = {
        name_avaliacao: "avaliador5",
        mensagem_avaliacao: "Quinta avaliação",
        jogo_avaliacao: "jogo5",
        
    }

    try{
        await Avaliacao.create(avaliacao1Jogo1)
        await Avaliacao.create(avaliacao2Jogo1)
        await Avaliacao.create(avaliacao3Jogo1)
        await Avaliacao.create(avaliacao4Jogo1)
        await Avaliacao.create(avaliacao5Jogo1)

        await Avaliacao.create(avaliacao1Jogo2)
        await Avaliacao.create(avaliacao2Jogo2)
        await Avaliacao.create(avaliacao3Jogo2)
        await Avaliacao.create(avaliacao4Jogo2)
        await Avaliacao.create(avaliacao5Jogo2)

        await Avaliacao.create(avaliacao1Jogo3)
        await Avaliacao.create(avaliacao2Jogo3)
        await Avaliacao.create(avaliacao3Jogo3)
        await Avaliacao.create(avaliacao4Jogo3)
        await Avaliacao.create(avaliacao5Jogo3)

        await Avaliacao.create(avaliacao1Jogo4)
        await Avaliacao.create(avaliacao2Jogo4)
        await Avaliacao.create(avaliacao3Jogo4)
        await Avaliacao.create(avaliacao4Jogo4)
        await Avaliacao.create(avaliacao5Jogo4)

        await Avaliacao.create(avaliacao1Jogo5)
        await Avaliacao.create(avaliacao2Jogo5)
        await Avaliacao.create(avaliacao3Jogo5)
        await Avaliacao.create(avaliacao4Jogo5)
        await Avaliacao.create(avaliacao5Jogo5)

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
module.exports = routerAvaliacao