const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress()
const app = express()
const path = require('path')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')

app.use(cookieParse())
app.use(
  session({
    secret: 'segredo-da-sessao',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000, // min x seg x mls
    },
  })
)



/*IMPORTAÇÃO DO DOTENV*/ 
dotenv.config()

/*FINAL DA IMPORTAÇÃO DO DOTENV */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")))

app.engine(".mustache", engine);
app.set("views", path.join(__dirname, "public/templates"));
app.set("view engine", "mustache")


const usersRoutes = require('./routes/usersRoutes')
app.use('/users', usersRoutes)

const colecaoRoutes = require('./routes/colecaoRoutes')
app.use('/colecao', colecaoRoutes)

const avaliacaoRoutes = require('./routes/avaliacaoRoutes')
app.use('/avaliacao', avaliacaoRoutes)

const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS, 
    },
    tls: {
        rejectUnauthorized: false
      }
  });

app.get('/', (req, res) =>{
    
    res.render("login");
})

app.get('/cards', (req, res) =>{
    let pass_user_login
    if(req.session.name_user_login){
       pass_user_login = req.session.name_user_login
    }else{
        pass_user_login = "Login";
    }
    res.render("inicio", {pass_user_login: pass_user_login});
})

app.get('/inicio', (req, res) =>{
    res.render("login")
})
app.get('/conteudo', (req, res) =>{
    res.render("sobreSite");
})

app.get('/tecnologia', (req, res) =>{
    res.render("tecnologias");
})

app.get('/sobreCriador', (req, res) =>{
    res.render("sobreCriador");
})

app.get('/contato', (req, res) =>{
    res.render("contato");
})

app.get('/cadastrarColecao', (req, res) =>{
  res.render("cadastrarColecao");
})

app.get('/telaAvaliacao', (req, res) =>{
  let pass_user_login
    if(req.session.name_user_login){
       pass_user_login = req.session.name_user_login
    }else{
        pass_user_login = "Login";
    }
  const name = req.query.name_colecao1; 
  const image = req.query.img_colecao1;
  res.render("telaAvaliacao", {name: name, image: image, pass_user_login: pass_user_login});
})

app.get('/telaAtualizaAvaliacao', (req, res) =>{
  let pass_user_login
    if(req.session.name_user_login){
       pass_user_login = req.session.name_user_login
    }else{
        pass_user_login = "Login";
    }
  const name_avaliacao = req.query.name_avaliacao; 
  const mensagem_avaliacao = req.query.mensagem_avaliacao;
  const _id = req.query._id;
  res.render("telaAtualizaAvaliacao", {name_avaliacao: name_avaliacao, mensagem_avaliacao: mensagem_avaliacao, _id: _id, pass_user_login: pass_user_login});
})

app.get('/atualizarColecao', (req, res) =>{
  let pass_user_login
    if(req.session.name_user_login){
       pass_user_login = req.session.name_user_login
    }else{
        pass_user_login = "Login";
    }
  const name_colecao = req.query.name_colecao; 
  const img_colecao = req.query.img_colecao;
  const _id = req.query._id;
  res.render("atualizarColecao", {name_colecao: name_colecao, img_colecao: img_colecao, _id: _id, pass_user_login: pass_user_login});
})

app.post('/enviaemail', (req, res) =>{

    const { name, email, _subject, message } = req.body;

    // Configuração do e-mail a ser enviado
    const mailOptions = {
      from: 'contato.spcegames@outlook.com',
      to: 'contato.spcegames@outlook.com',
      subject: _subject,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
    };
  
    // Envio do e-mail
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Erro ao enviar o e-mail');
      } else {
        console.log('E-mail enviado: ' + info.response);
        res.send('E-mail enviado com sucesso');
      }
    });
})

app.post('/tecnologia', (req, res) =>{
    res.redirect('/tecnologias');
})

app.post('/telaAvaliacao', (req, res) =>{
  res.redirect('/telaAvaliacao');
})

app.post('/atualizarColecao', (req, res) =>{
  res.redirect('/atualizarColecao');
})

app.post('/telaAtualizaAvaliacao', (req, res) =>{
  res.redirect('/telaAtualizaAvaliacao');
})

app.post('/cadastrarColecao', (req, res) =>{
  res.redirect('/cadastrarColecao');
})

app.post('/sobreCriador', (req, res) =>{
    res.redirect('/sobreCriador');
})

app.post('/contato', (req, res) =>{
    res.redirect('/contato');
})

app.post('/inicio', (req, res) =>{
    res.redirect('/login');
})


mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'.9n6lkdw.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority')

.then(() =>{
    console.log("Conectado ao mongo")
    app.listen(3000, () =>{
        console.log('Servidor iniciado...')
    })
})
.catch((err) => console.log(err))
