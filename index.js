const express = require('express');
// para variables de entorno npm i dotenv
require('dotenv').config();

const path = require('path');
// import routes
const apiRouter = require('./routes/api');

const app = express();

// view Pug
app.set('view engine', 'pug');

require('./db');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false})) // estaba en true
// To save static files like images
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
// Ruta view pug
app.get('/form', (req, res) => {
    res.render('index');
})

// -------------------------------------


// iniciar con nodemon index.js

app.listen(3000, () => {
    console.log('Servidor funcionando');
});