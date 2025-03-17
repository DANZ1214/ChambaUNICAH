'use strict';

// Importa las dependencias necesarias
const express = require('express');
const docenteController = require('../controllers/docenteController');
const apiRoutes = express.Router();
// Importa el middleware de autenticación.
const auth = require('../middlewares/auth')

// Ruta para obtener los datos de un docente
// La ruta está protegida por el middleware de autenticación
apiRoutes.get('/getDocente', auth.isAuth, async(req, res) => await docenteController.getDocente(req, res));

// Ruta para insertar un nuevo docente
// Esta ruta también está protegida por el middleware de autenticación
apiRoutes.post('/insertDocente', auth.isAuth, async(req, res) => await docenteController.insertDocente(req, res));

// Ruta para actualizar los datos de un docente
// Protegida por el middleware de autenticación
apiRoutes.put('/updateDocente', auth.isAuth, async(req, res) => await docenteController.updateDocente(req, res));

// Ruta para eliminar un docente
// También está protegida por el middleware de autenticación
apiRoutes.delete('/deleteDocente', auth.isAuth, async(req, res) => await docenteController.deleteDocente(req, res));


// Exporta las rutas configuradas para que sean utilizadas en otras partes de la aplicación
module.exports = apiRoutes;
