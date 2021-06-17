const express = require('express');

// import routes
const apiRouter = require('./routes/api');

const app = express();

require('./db');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRouter)

// app.get('/', (req, res) => {
//     res.send('Hola mundo!');
// });

// iniciar con nodemon index.js

app.listen(3000, () => {
    console.log('Servidor funcionando');
});