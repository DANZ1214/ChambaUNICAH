'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const apiRoutes = express.Router();

apiRoutes.get('/getUser', userController.getUser);
apiRoutes.post('/insertUser', userController.insertUser);
apiRoutes.put('/updateUser', userController.updateUser);
apiRoutes.delete('/deleteUser', userController.deleteUser);

module.exports = apiRoutes;
