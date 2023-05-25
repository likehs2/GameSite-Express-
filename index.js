const express = require('express')
const bodyParser = require('body-parser')
const personRoutes = require('./routes/personRoutes')
const mustacheExpress = require('mustache-express');
const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('.mustache', mustacheExpress());
app.set('template engine', 'mustache');


app.get('/', (req, res) =>{
    res.render('index');
})
