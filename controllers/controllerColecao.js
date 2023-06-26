const Colecao = require('../models/Colecao')

const createColecao = async (req, res) =>{
    const {name_colecao, img_colecao} = req.body

    if(!name_colecao){
        res.status(422).json({ error: 'o nome é obrigatorio' })
    }
   

    const existingColecao = await Colecao.findOne({ name_colecao });

    if (existingColecao) {
        return res.status(422).json({ error: 'O jogo ja está cadastrado' });
    }

    const colecao = {
        name_colecao,
        img_colecao,
        
    }

    try{
        await Colecao.create(colecao)

        res.status(201).json({message: "Usuario cadastrado"})

    }catch (error) {
        res.status(500).json({error: error})
    }
}

const findColecao = async (req, res) =>{
    try {
        const colecao = await Colecao.find()

        res.status(200).json(colecao)

    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const findUnicaColecao = async (req, res) =>{
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
    deleteColecao
}