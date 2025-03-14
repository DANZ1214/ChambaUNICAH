'use strict'

const db = require('../config/db')
const clase = db.clase;

async function getClase(req, res) {
    clase.findAll({
        attributes: ['id_clase', 'nombre_clase' ] // Seleccionar solo estas columnas
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({ message: error.message || "Sucedió un error inesperado" })
    });
}

module.exports = {
    getClase
}

