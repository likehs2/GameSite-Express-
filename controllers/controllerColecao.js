const Colecao = require('../models/Colecao')

const createColecao = async (req, res) =>{  
    console.log("entrou na createColecao")  
    const name_colecao = req.body.name_colecao
    const img_colecao = req.body.img_colecao
    console.log(name_colecao, img_colecao + "dentro da funcao")
    const colecao ={
        name_colecao,
        img_colecao,
    }
    console.log(colecao + "colecao dentro da funcao")
    try{
        await Colecao.create(colecao)

        res.status(201).json({message: "Jogo cadastrado"})

    }catch (error) {
        res.status(500).json({error: error})
    }
}

const findColecao = async (req, res) =>{
    try {
        const colecao = await Colecao.find()
        return colecao

    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const findUnicaColecao = async (req, res) =>{
    const name_colecao = req.body
    console.log(name_colecao)

    try {
        const colecao = await Colecao.findOne({ name_colecao: name_colecao })

        if(!colecao) {
            res.status(422).json({ message: 'Jogo não encontrado!'})
        }
        return colecao
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const updateColecao = async (req, res) =>{
    const id = req.params.id
    const {name_colecao, img_colecao} = req.body


    const colecao = {
        name_colecao,
        img_colecao
    }

    try {
        const updateColecao = await Colecao.updateOne({ _id: id })

        res.status(200).json(updateColecao)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const createAvaliacao = async (req, res) =>{
    const {avaliador_colecao, mensagem_colecao, jogo_avaliacao} = req.body


    const colecao = {
        avaliacao_colecao: {
            avaliador_colecao,
            mensagem_colecao,
        },  
        
    }

    try {
        const updateColecao = await Colecao.updateOne({ name_colecao: jogo_avaliacao }, colecao)

        res.status(200).json(updateColecao)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}



const deleteColecao = async (req, res) =>{
    const id = req.params.id

    const colecao = await Colecao.findOne({ _id: id })
    if(!colecao){
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try{
        await Colecao.deleteOne({_id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso' })
    }catch(error){
        res.status(500).json({ error: error })
    }

}

module.exports ={
    createColecao,
    findColecao,
    findUnicaColecao,
    updateColecao,
    deleteColecao,
    createAvaliacao
}