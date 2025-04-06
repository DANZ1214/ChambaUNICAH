'use strict'

// Importa las dependencias necesarias
const express = require('express');
const alumnoController = require('../controllers/alumnoController');
const apiRoutes = express.Router();
// Importa el middleware de autenticación.
const auth = require('../middlewares/auth')

// Ruta para obtener los datos de un alumno
// La ruta es protegida por el middleware de autenticación
apiRoutes.get('/getAlumno', /*auth.isAuth,*/ async(req, res) => await alumnoController.getAlumno(req, res));

// Ruta para insertar un nuevo alumno
// También está protegida por el middleware de autenticación
apiRoutes.post('/insertAlumno', auth.isAuth, async(req, res) => await alumnoController.insertAlumno(req, res));

// Ruta para eliminar un alumno
// Protegida por el middleware de autenticación
apiRoutes.delete('/deleteAlumno', auth.isAuth, async(req, res) => await alumnoController.deleteAlumno(req, res));


// Ruta para actualizar los datos de un alumno
// Esta ruta también está protegida por el middleware de autenticación
apiRoutes.put('/updateAlumno', auth.isAuth, async (req, res) => await alumnoController.updateAlumno(req, res));


// Exporta las rutas configuradas para que sean utilizadas en otras partes de la aplicación
module.exports = apiRoutes;
