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
//const puppeteer = require('puppeteer')
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
    let rota
    let pass_user_login
    if(req.session.name_user_login){
      pass_user_login = req.session.name_user_login
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
   }else{
       pass_user_login = "Login";
       rota = "/"
   }
    res.render("inicio", {pass_user_login: pass_user_login, rota: rota});
})

app.get('/inicio', (req, res) =>{
    res.render("login")
})

app.get('/relatorioUsuario', (req, res) => {
  res.render('relatorioUsuario');
});
/*
app.get('/relatorioUsuarioPDF', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/relatorioUsuario', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(2000); 
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Erro ao gerar o PDF:', error);
    res.status(500).send('Erro ao gerar o PDF');
  }
});
*/
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
  let rota
  const name = req.query.name_colecao1; 
  const image = req.query.img_colecao1;
    if(req.session.name_user_login){
       pass_user_login = req.session.name_user_login
       rota = "/atualizarUsuario?name_user={{pass_user_login}}"
       res.render("telaAvaliacao", {name: name, image: image, pass_user_login: pass_user_login, rota: rota});
    }else{
        pass_user_login = "Login";
        res.redirect('/inicio');
    }
})

app.get('/telaAtualizaAvaliacao', (req, res) =>{
  let pass_user_login
  let rota
  const name_avaliacao = req.query.name_avaliacao; 
  const mensagem_avaliacao = req.query.mensagem_avaliacao;
  const _id = req.query._id;
    if(req.session.name_user_login){
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
       pass_user_login = req.session.name_user_login
       res.render("telaAtualizaAvaliacao", {name_avaliacao: name_avaliacao, mensagem_avaliacao: mensagem_avaliacao, _id: _id, pass_user_login: pass_user_login, rota: rota});
    }else{
        pass_user_login = "Login";
        res.redirect('/inicio');
    }
  
})

app.get('/atualizarColecao', (req, res) =>{
  let pass_user_login
  let rota
  const name_colecao = req.query.name_colecao; 
  const img_colecao = req.query.img_colecao;
  const _id = req.query._id;
    if(req.session.name_user_login){
       pass_user_login = req.session.name_user_login
       rota = "/atualizarUsuario?name_user={{pass_user_login}}"
       res.render("atualizarColecao", {name_colecao: name_colecao, img_colecao: img_colecao, _id: _id, pass_user_login: pass_user_login, rota: rota});
    }else{
        pass_user_login = "Login";
        res.redirect('/inicio');
    }
   
})

app.get('/atualizarUsuario', (req, res) =>{
  let pass_user_login
  let rota
  
    if(req.session.name_user_login){
       pass_user_login = req.session.name_user_login
       rota = "/atualizarUsuario?name_user={{pass_user_login}}"
    }else{
        pass_user_login = "Login";
        rota = "/"
    }
  
  res.render("atualizarUsuario", {pass_user_login: pass_user_login, rota: rota});
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

app.post('/relatorioUsuario', (req, res) =>{
  res.redirect('/relatorioUsuario');
})

app.post('/telaAvaliacao', (req, res) =>{
  res.redirect('/telaAvaliacao');
})

app.post('/atualizarUsuario', (req, res) =>{
  res.redirect('/atualizarUsuario');
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
    res.redirect('/');
})


mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'.9n6lkdw.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority')

.then(() =>{
    console.log("Conectado ao mongo")
    app.listen(3000, () =>{
        console.log('Servidor iniciado...')
    })
})
.catch((err) => console.log(err))
