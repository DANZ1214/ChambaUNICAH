'use strict'

const db = require('../config/db')
const alumno = db.alumno;

// Obtener un nuevo alumno
async function getAlumno(req, res) {
    alumno.findAll()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({ message: error.message || "Sucedió un error inesperado" })
    });
}

// Insertar un nuevo alumno
async function insertAlumno(req, res) {
    const { alumnoId, nombre, facultadId } = req.body; // Incluimos alumnoId

    alumno.create({ alumnoId, nombre, facultadId }) // Insertamos incluyendo el ID
    .then(result => {
        res.status(201).send({ message: "Alumno creado exitosamente", result });
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al insertar alumno" });
    });
}



module.exports = {
    getAlumno,
    insertAlumno
}

