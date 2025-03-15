'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const apiRoutes = express.Router();

apiRoutes.get('/getUser', userController.getUser);

module.exports = apiRoutes;
