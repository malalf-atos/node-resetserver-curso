//==========================
//Puerto
//==========================
process.env.PORT = process.env.PORT || 3000;

//==========================
//Entorno
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'



//==========================
//Fecha de token
//==========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//==========================
//Fecha de token
//==========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'


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


//==========================
//Google Client ID
//==========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '263558524185-dsh3r0neks401er19sabd0fv9ri74tvt.apps.googleusercontent.com';