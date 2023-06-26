const Users = require('../models/Users')

const createUser = async (req, res) =>{
    const {name_user, pass_user, email_user} = req.body

    if(!name_user){
        res.status(422).json({ error: 'o nome é obrigatorio' })
    }

    const existingUser = await Users.findOne({ name_user });

    if (existingUser) {
        return res.status(422).json({ error: 'O nome de usuário já está em uso' });
    }

    const users = {
        name_user,
        pass_user,
        email_user,
        adm_user: false
    }

    try{
        await Users.create(users)

        res.status(201).json(users)

    }catch (error) {
        res.status(500).json({error: error})
    }
}

const findUsers = async (req, res) =>{
    try {
        const usuarios = await Users.find()

        res.status(200).json(usuarios)

    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const findUnicoUser = async (req, res) =>{
    const id = req.params.id

    try {
        const usuarios = await Users.findOne({ _id: id })

        if(!usuarios) {
            res.status(422).json({ message: 'Usuário não encontrado!'})
            return
        }
        res.status(200).json(usuarios)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}


const updateUser = async (req, res) =>{
    const id = req.params.id
    const {name_user, pass_user, email_user, adm_user} = req.body


    const users = {
        name_user,
        pass_user,
        email_user,
        adm_user
    }

    try {
        const updateUsuarios = await Users.updateOne({ _id: id })

        res.status(200).json(usuarios)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}


const deleteUser = async (req, res) =>{
    const id = req.params.id

    const usuarios = await Users.findOne({ _id: id })
    if(!usuarios){
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try{
        await Users.deleteOne({_id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso' })
    }catch(error){
        res.status(500).json({ error: error })
    }

}

module.exports ={
    createUser,
    findUsers,
    findUnicoUser,
    updateUser,
    deleteUser
}