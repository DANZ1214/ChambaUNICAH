'use strict';

const express = require('express');
const excusaController = require('../controllers/excusasController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer'); // Asegúrate de que este archivo esté correctamente configurado
const apiRoutes = express.Router();

// Ruta para obtener las excusas
apiRoutes.get('/getExcusa', /*auth.isAuth,*/ async (req, res) => await excusaController.getExcusa(req, res));

// Ruta para insertar una excusa (con subida de archivo)
apiRoutes.post('/insertExcusa', /*auth.isAuth,*/ upload.single('archivo'), async (req, res) => await excusaController.insertExcusa(req, res));

// Ruta para eliminar una excusa
apiRoutes.delete('/deleteExcusa', auth.isAuth, async (req, res) => await excusaController.deleteExcusa(req, res));

// Ruta para actualizar una excusa
apiRoutes.put('/updateExcusa', auth.isAuth, async (req, res) => await excusaController.updateExcusa(req, res));

module.exports = apiRoutes;
