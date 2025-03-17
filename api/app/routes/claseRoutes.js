'use strict';

// Importa las dependencias necesarias
const express = require('express');
const claseController = require('../controllers/claseController');
const apiRoutes = express.Router();
// Importa el middleware de autenticación.
const auth = require('../middlewares/auth')

// Ruta para obtener los datos de una clase
// La ruta está protegida por el middleware de autenticación
apiRoutes.get('/getClase', auth.isAuth, async(req, res) => await claseController.getClase(req, res));

// Ruta para insertar una nueva clase
// También está protegida por el middleware de autenticación
apiRoutes.post('/insertClase', auth.isAuth, async(req, res) => await claseController.insertClase(req, res));

// Ruta para actualizar los datos de una clase
// Esta ruta también está protegida por el middleware de autenticación
apiRoutes.put('/updateClase', auth.isAuth, async(req, res) => await claseController.updateClase(req, res));

// Ruta para eliminar una clase
// Protegida por el middleware de autenticación
apiRoutes.delete('/deleteClase', auth.isAuth, async(req, res) => await claseController.deleteClase(req, res));

// Exporta las rutas configuradas para que sean utilizadas en otras partes de la aplicación
module.exports = apiRoutes;
