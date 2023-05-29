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
    res.render("contato");
})

app.listen(3000, () =>{
    console.log('Servidor iniciado...')
})