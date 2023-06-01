const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress()
const app = express()
const path = require('path')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const mongoose = require('mongoose')



/*IMPORTAÇÃO DO DOTENV*/ 
dotenv.config()

/*FINAL DA IMPORTAÇÃO DO DOTENV */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")))// Para funcionar as tags img

app.engine(".mustache", engine);
app.set("views", path.join(__dirname, "public/templates"));
app.set("view engine", "mustache")


const usersRoutes = require('./routes/usersRoutes')//Definindo o caminho da API
app.use('/users', usersRoutes)//Definindo o caminho da API


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
    res.render("menucards");
})

app.get('/menucards', (req, res) =>{
    res.render("menucards");
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

app.post('/menucards', (req, res) =>{
    res.redirect('/menucards');
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
