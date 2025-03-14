'use strict'

const db = require('../config/db')
const docente = db.docente;

async function getDocente(req, res) {
    docente.findAll({
        attributes: ['docenteId', 'email', 'nombre' ] // Seleccionar solo estas columnas
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({ message: error.message || "Sucedió un error inesperado" })
    });
}

module.exports = {
    getDocente
}

