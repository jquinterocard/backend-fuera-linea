const express = require('express');


// Cargar enrutador
const router = express.Router();

// Cargar controlador
const areaController = require('../controllers/area.controller');

// Cargar middlewares
const md_validation = require('../middlewares/validation');

// Asignar rutas
router.get('/areas', areaController.getAll);
router.post('/sync', md_validation.validarArea, areaController.sincronizar);


// Exportar modulos
module.exports = router;