'use strict'

const express = require('express');
const excusaController = require('../controllers/excusasController');
const apiRoutes = express.Router();

apiRoutes.get('/getExcusa',async(req, res) => await excusaController.getExcusa(req, res));
apiRoutes.post('/insertExcusa',async(req, res) => await excusaController.insertExcusa(req, res));
apiRoutes.delete('/deleteExcusa',async(req, res) => await excusaController.deleteExcusa(req, res));
apiRoutes.put('/updateExcusa', async (req, res) => await excusaController.updateExcusa(req, res));


module.exports = apiRoutes;
