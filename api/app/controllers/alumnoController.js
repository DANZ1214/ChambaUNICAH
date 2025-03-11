'use strict'

const db = require('../config/db')
const alumno = db.alumno;

async function getAlumno(req, res) {
    alumno.findAll({
        attributes: ['alumnoId', 'nombre', 'facultadId'] // Seleccionar solo estas columnas
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({ message: error.message || "Sucedió un error inesperado" })
    });
}

module.exports = {
    getAlumno
}

