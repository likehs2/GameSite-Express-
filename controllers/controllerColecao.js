const Colecao = require('../models/Colecao')

const createColecao = async (req, res) =>{   
    const name_colecao = req.body.name_colecao
    const img_colecao = req.body.img_colecao
    const colecao ={
        name_colecao,
        img_colecao,
    }
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
    const {name_colecao, img_colecao} = req.body


    const colecao = {
        name_colecao,
        img_colecao,        
    }

    try {
        const updateColecao = await Colecao.updateOne({ _id: req.params.id }, colecao)

        res.status(200).json({message: 'Atualizado'})
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}



const deleteColecao = async (req, res) =>{

    const colecao = await Colecao.findOne({ _id: req.params.id })
    if(!colecao){
        res.status(422).json({ message: 'Colecao não encontrado!' })
        return
    }

    try{
        await Colecao.deleteOne({_id: req.params.id})

        res.status(200).json({ message: 'Colecao removida com sucesso' })
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