'use strict';

// Importa el módulo express para crear el enrutador.
const express = require('express');

// Importa el controlador de excusas que contiene la lógica de las rutas.
const excusaController = require('../controllers/excusasController');

// Crea una nueva instancia de enrutador de express.
const apiRoutes = express.Router();

// Importa el middleware de autenticación.
const auth = require('../middlewares/auth');

/**
 * Define las rutas de la API para las operaciones relacionadas con las excusas.
 */

/** Ruta para obtener todas las excusas. */
apiRoutes.get('/getExcusa', auth.isAuth, async (req, res) => await excusaController.getExcusa(req, res));

/** Ruta para insertar una nueva excusa. */
apiRoutes.post('/insertExcusa', auth.isAuth, async (req, res) => await excusaController.insertExcusa(req, res));

/** Ruta para eliminar una excusa existente. */
apiRoutes.delete('/deleteExcusa', auth.isAuth, async (req, res) => await excusaController.deleteExcusa(req, res));

/** Ruta para actualizar una excusa existente. */
apiRoutes.put('/updateExcusa', auth.isAuth, async (req, res) => await excusaController.updateExcusa(req, res));

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = apiRoutes;
