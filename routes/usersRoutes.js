const router = require('express').Router()
const Users = require('../models/Users')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')

router.use(cookieParse())
router.use(
  session({
    secret: 'segredo-da-sessao',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000, // min x seg x mls
    },
  })
)
  

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

        res.status(201).json(users)

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

router.get('/procura/:id', async (req, res) =>{
    const name_user = req.params.id

    try {
        const usuarios = await Users.find({ name_user: name_user })

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

router.post('/atualiza/:nome', async (req, res) =>{
    const nome = req.params.nome
    const {pass_user} = req.body


    const users = {
        pass_user,
    }

    try {
        const updateUsuarios = await Users.updateOne({ name_user: nome }, users)

        res.status(200).json({message: "atualizado"})
        
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

router.post('/deletar/:nome', async (req, res) =>{
    const nome = req.params.nome

    const usuarios = await Users.findOne({ name_user: nome })
    if(!usuarios){
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try{
        await Users.deleteOne({name_user: nome})

        res.status(200).json({ message: "usuario deletado" })
    }catch(error){
        res.status(500).json({ error: error })
    }

})

router.get('/deletar/:id', async (req, res) =>{
    const id = req.params.id

    const usuarios = await Users.findOne({ _id: id })
    if(!usuarios){
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try{
        await Users.deleteOne({_id: id})

        res.status(200).json({ message: "Usuario deletado" })
        
    }catch(error){
        res.status(500).json({ error: error })
    }

})

router.post('/CarregarDados', async (req, res) =>{

    const user1 = {
        name_user: "avaliador1",
        pass_user: "1234",
        email_user: "avaliador@hotmail.com",
        adm_user: false
    }

    const user2 = {
        name_user: "avaliador2",
        pass_user: "1234",
        email_user: "avaliador@hotmail.com",
        adm_user: false
    }

    const user3 = {
        name_user: "avaliador3",
        pass_user: "1234",
        email_user: "avaliador@hotmail.com",
        adm_user: false
    }

    const user4 = {
        name_user: "avaliador4",
        pass_user: "1234",
        email_user: "avaliador@hotmail.com",
        adm_user: false
    }

    const user5 = {
        name_user: "avaliador5",
        pass_user: "1234",
        email_user: "avaliador@hotmail.com",
        adm_user: false
    }

    try{
        await Users.create(user1)
        await Users.create(user2)
        await Users.create(user3)
        await Users.create(user4)
        await Users.create(user5)

        res.status(201).json({message: "usuarios criados"})

    }catch (error) {
        res.status(500).json({error: error})
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
        
        res.status(200).json({message: "Login realizado"})
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o login' });
    }
});




module.exports = router