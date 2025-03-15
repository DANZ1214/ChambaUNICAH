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

async function deleteAlumno(req, res) {
    const { alumnoId } = req.body; // Obtener el ID desde el cuerpo de la solicitud

    if (!alumnoId) {
        return res.status(400).send({ message: "Se requiere un alumnoId válido" });
    }

    alumno.destroy({
        where: { alumnoId }
    })
    .then(deleted => {
        if (deleted) {
            res.status(200).send({ message: "Alumno eliminado exitosamente" });
        } else {
            res.status(404).send({ message: "Alumno no encontrado" });
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al eliminar alumno" });
    });
}




module.exports = {
    getAlumno,
    insertAlumno,
    deleteAlumno
}

