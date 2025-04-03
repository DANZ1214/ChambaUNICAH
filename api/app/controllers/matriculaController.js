'use strict';

const db = require('../config/db');
const matricula = db.matricula;

async function getMatricula(req, res) {
    matricula.findAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ message: error.message || "Sucedió un error inesperado" });
        });
}

module.exports = {
    getMatricula
};