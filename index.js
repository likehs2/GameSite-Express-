const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress()
const app = express()
const path = require('path')
const nodemailer = require('nodemailer')

/*IMPORTAÇÃO DO DOTENV 
import * as dotenv from 'dotenv'
dotenv.config()

FINAL DA IMPORTAÇÃO DO DOTENV */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"public")))// Para funcionar as tags img

app.engine(".mustache", engine);
app.set("views", path.join(__dirname, "public/templates"));
app.set("view engine", "mustache")

const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contato.spcegames@outlook.com", // generated ethereal user
      pass: "jogodeahri123", // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
      }
  });

app.get('/', (req, res) =>{
    res.render("login");
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

app.post('/sobreCriador', (req, res) =>{
    res.redirect('/sobreCriador');
})

app.post('/contato', (req, res) =>{
    res.redirect('/contato');
})

app.post('/inicio', (req, res) =>{
    res.redirect('/login');
})


app.listen(3000, () =>{
    console.log('Servidor iniciado...')
})