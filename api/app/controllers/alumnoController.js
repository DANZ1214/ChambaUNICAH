'use strict'

const db = require('../config/db')
const alumno = db.alumno;

async function getAlumno(req,res) {
    alumno.findAll()
    .then(result=> {
        res.estatus(200).send({ result })
    })
    .catch(error=> {
        res.status(500).send({message: error.message || "Sucedio un error inesperado"})
});
}

module.exports = {
    getAlumno
}