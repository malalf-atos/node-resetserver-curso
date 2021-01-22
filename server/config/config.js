//==========================
//Puerto
//==========================
process.env.PORT = process.env.PORT || 3000;

//==========================
//Entorno
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==========================
//Base de datos
//==========================
const userMA = process.env.MONGO_USER || '';
const passMA = process.env.MONGO_PASS || '';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = `mongodb+srv://${userMA }:${ passMA }@cluster0.nskf0.mongodb.net/cafe`;
}

process.env.URLDB = urlDB;