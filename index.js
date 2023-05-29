const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress()
const app = express()
const path = require('path')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine(".mustache", engine);
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "mustache")


app.get('/', (req, res) =>{
    res.render("login");
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


app.listen(3000, () =>{
    console.log('Servidor iniciado...')
})