'use strict';

// Importa el módulo express para crear el enrutador.
const express = require('express');
// Importa el controlador de usuarios que contiene la lógica de las rutas.
const userController = require('../controllers/userController');
// Crea una nueva instancia de enrutador de express.
const apiRoutes = express.Router();

/**
 * Define las rutas de la API para las operaciones relacionadas con los usuarios.
 *
 * @module apiRoutes
 */

/**
 * Ruta para obtener todos los usuarios.
 */
apiRoutes.get('/getUser', userController.getUser);

/**
 * Ruta para insertar un nuevo usuario.
 */
apiRoutes.post('/insertUser', userController.insertUser);

/**
 * Ruta para actualizar un usuario existente.
 */
apiRoutes.put('/updateUser', userController.updateUser);

/**
 * Ruta para eliminar un usuario existente.
 */
apiRoutes.delete('/deleteUser', userController.deleteUser);

apiRoutes.post('/login', userController.login);




// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = apiRoutes;
