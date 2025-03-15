'use strict';

const express = require('express');
const docenteController = require('../controllers/docenteController');
const apiRoutes = express.Router();

apiRoutes.get('/getDocente', docenteController.getDocente);
apiRoutes.post('/insertDocente', docenteController.insertDocente);
apiRoutes.put('/updateDocente', docenteController.updateDocente);
apiRoutes.delete('/deleteDocente', docenteController.deleteDocente);

module.exports = apiRoutes;
