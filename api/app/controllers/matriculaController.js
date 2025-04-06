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

async function insertMatricula(req, res) {
    const { alumnoId, id_clase, docenteId, id_excusa, estado} = req.body;

    matricula.create({ 
        alumnoId, 
        id_clase, 
        docenteId, 
        id_excusa, 
        estado
    })
    .then(result => {
        res.status(201).send({ message: "Matrícula creada exitosamente", result });
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al insertar matrícula" });
    });
}

async function updateMatricula(req, res) {
    const { matriculaId, id_clase, docenteId, id_excusa, estado } = req.body;

    if (!matriculaId) {
        return res.status(400).send({ message: "Se requiere un matriculaId válido" });
    }

    matricula.update(
        { 
            id_clase, 
            docenteId, 
            id_excusa, 
            estado 
        },
        { 
            where: { matriculaId } 
        }
    )
    .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
            res.status(200).send({ message: "Matrícula actualizada exitosamente" });
        } else {
            res.status(404).send({ message: "Matrícula no encontrada" });
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al actualizar matrícula" });
    });
}

async function deleteMatricula(req, res) {
    const { matriculaId } = req.body;

    if (!matriculaId) {
        return res.status(400).send({ message: "Se requiere un matriculaId válido" });
    }

    matricula.destroy({
        where: { matriculaId }
    })
    .then(deleted => {
        if (deleted) {
            res.status(200).send({ message: "Matrícula eliminada exitosamente" });
        } else {
            res.status(404).send({ message: "Matrícula no encontrada" });
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al eliminar matrícula" });
    });
}




module.exports = {
    getMatricula,
    insertMatricula,
    updateMatricula,
    deleteMatricula
};