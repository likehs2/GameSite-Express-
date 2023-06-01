const router = require('express').Router()
const Users = require('../models/Users')

router.post('/', async (req, res) =>{
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

router.post('/login', async (req, res) => {
    const { name_user_login, pass_user_login } = req.body;

    try {
        // Verifica se o usuário existe no banco de dados
        const user = await Users.findOne({ name_user: name_user_login });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se a senha está correta
        if (pass_user_login !== user.pass_user) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Login bem-sucedido
        res.status(200).redirect('/menucards');
        
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o login' });
    }
});

module.exports = router