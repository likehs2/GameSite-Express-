const routerColecao = require('express').Router()
const Colecao = require('../models/Colecao')
const API = require("../controllers/controllerColecao")


routerColecao.post('/cadastrar', API.createColecao)


routerColecao.get('/buscar', async (req, res) =>{
    
    const colecao = await API.findColecao()
    res.json(colecao)
    
})

routerColecao.get('/:id', async (req, res) =>{
    const id = req.params.id

    try {
        const usuarios = await Colecao.findOne({ _id: id })

        if(!usuarios) {
            res.status(422).json({ message: 'Jogo não encontrado!'})
            return
        }
        res.status(200).json(usuarios)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
})


routerColecao.post('/atualiza/:id', async (req, res) =>{
    const id = req.params.id
    const {name_colecao, img_colecao} = req.body


    const colecao = {
        name_colecao,
        img_colecao,
    }

    try {
        const updateColecao = await Colecao.updateOne({ _id: id }, colecao)

        res.status(200).redirect('/cards')
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

routerColecao.delete('/:id', async (req, res) =>{
    const id = req.params.id

    const usuarios = await Colecao.findOne({ _id: id })
    if(!usuarios){
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try{
        await Colecao.deleteOne({_id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso' })
    }catch(error){
        res.status(500).json({ error: error })
    }

})

routerColecao.post('/CarregarDados', async (req, res) =>{

    const jogo1 = {
        name_colecao: "jogo1",
        img_colecao: "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg",
        
    }
    const jogo2 = {
        name_colecao: "jogo2",
        img_colecao: "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg",
        
    }
    const jogo3 = {
        name_colecao: "jogo3",
        img_colecao: "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg",
        
    }
    const jogo4 = {
        name_colecao: "jogo4",
        img_colecao: "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg",
        
    }
    const jogo5 = {
        name_colecao: "jogo5",
        img_colecao: "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg",
        
    }

    try{
        await Colecao.create(jogo1)
        await Colecao.create(jogo2)
        await Colecao.create(jogo3)
        await Colecao.create(jogo4)
        await Colecao.create(jogo5)

        res.status(201).redirect('/cards')

    }catch (error) {
        res.status(500).json({error: error})
    }
})

routerColecao.get('/deletar/:id', async (req, res) =>{
    const id = req.params.id

    const usuarios = await Colecao.findOne({ _id: id })
    if(!usuarios){
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try{
        await Colecao.deleteOne({_id: id})

        res.status(200).redirect("/cards")
    }catch(error){
        res.status(500).json({ error: error })
    }

})

module.exports = routerColecao