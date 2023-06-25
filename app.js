const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress()
const app = express();

dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

app.engine(".mustache", engine);
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "mustache")


mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'.9n6lkdw.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority')

.then(() =>{
    console.log("Conectado ao mongo")
    app.listen(3000, () =>{
        console.log('Servidor iniciado...')
    })
})
.catch((err) => console.log(err))


routes(app);


module.exports = app;