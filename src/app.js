// Cargar modulos
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Cargar archivos de rutas
const area_routes = require('./routes/area');
const articulo_routes = require('./routes/articulo');


// Crear aplicacion de express
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// Rutas
app.use('/api', area_routes);
app.use('/api', articulo_routes);


// Exportar el modulo
module.exports = app;