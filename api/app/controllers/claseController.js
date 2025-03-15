'use strict'

const db = require('../config/db')
const clase = db.clase;

async function getClase(req, res) {
    clase.findAll()
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

