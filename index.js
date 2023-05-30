const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress()
const app = express()
const path = require('path')

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