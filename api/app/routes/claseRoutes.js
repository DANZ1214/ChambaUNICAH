'use strict';

const express = require('express');
const claseController = require('../controllers/claseController');
const apiRoutes = express.Router();

apiRoutes.get('/getClase', claseController.getClase);
apiRoutes.post('/insertClase', claseController.insertClase);
apiRoutes.put('/updateClase', claseController.updateClase);
apiRoutes.delete('/deleteClase', claseController.deleteClase);

module.exports = apiRoutes;
