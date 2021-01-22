require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// const mainRoutes = require('./routes/usuario');
// app.use(mainRoutes, (req, res, next) => {
//     console.log('Request Type:', req.method);
//     next();
// });

app.use(require('./routes/usuario'));

let urlDB = process.env.URLDB;

mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {

    if (err) throw err;

    console.log('base de datos ONLINE');
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Escuchando puerto: ', port);
});