const express = require('express');

// Cargar enrutador
const router = express.Router();

// Cargar controlador
const articuloController = require('../controllers/articulo.controller');

// Asignar rutas
router.get('/articulos', articuloController.listarArticulos);

// Exportar modulos
module.exports = router;