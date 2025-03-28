'use strict';

const express = require('express');
const excusaController = require('../controllers/excusasController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer'); // Importa tu configuración de Multer
const apiRoutes = express.Router();

apiRoutes.get('/getExcusa', /*auth.isAuth,*/ async (req, res) => await excusaController.getExcusa(req, res));

/**
 * Utiliza el middleware 'upload.single('archivo')' para manejar la subida de un único archivo
 * con el nombre de campo 'archivo' en el formulario.
 */
apiRoutes.post('/insertExcusa', /*auth.isAuth,*/ upload.single('archivo'), async (req, res) => await excusaController.insertExcusa(req, res));

apiRoutes.delete('/deleteExcusa', auth.isAuth, async (req, res) => await excusaController.deleteExcusa(req, res));

apiRoutes.put('/updateExcusa', auth.isAuth, async (req, res) => await excusaController.updateExcusa(req, res));

module.exports = apiRoutes;