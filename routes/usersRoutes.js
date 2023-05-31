const router = require('express').Router()
const Users = require('../models/Users')

router.post('/', async (req, res) =>{
    const {name_user, pass_user, email_user, adm_user} = req.body

    if(!name_user){
        res.status(422).json({ error: 'o nome é obrigatorio' })
    }

    const users = {
        name_user,
        pass_user,
        email_user,
        adm_user
    }

    try{
        await Users.create(users)

        res.status(201).json({ message: 'Usuario inserido no sistema com sucesso!' })

    }catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) =>{
    try {
        const usuarios = await Users.find()

        res.status(200).json(usuarios)

    } catch (error) {
        res.status(500).json({ error: error})
    }
})

router.get('/:id', async (req, res) =>{
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
})

router.patch('/:id', async (req, res) =>{
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
})

router.delete('/:id', async (req, res) =>{
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

})

module.exports = router