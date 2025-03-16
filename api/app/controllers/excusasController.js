'use strict';

const db = require('../config/db');
const excusa = db.excusa;

// Obtener excusas
async function getExcusa(req, res) {
    excusa.findAll()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({ message: error.message || "Sucedió un error inesperado" });
    });
}

// Insertar una nueva excusa
async function insertExcusa(req, res) {
    const { id_excusa, alumnoId, razon, archivo, fecha_solicitud, estado } = req.body;

    excusa.create({ id_excusa, alumnoId, razon, archivo, fecha_solicitud, estado })
    .then(result => {
        res.status(201).send({ message: "Excusa creada exitosamente", result });
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al insertar excusa" });
    });
}

// Eliminar una excusa
async function deleteExcusa(req, res) {
    const { id_excusa } = req.body;

    if (!id_excusa) {
        return res.status(400).send({ message: "Se requiere un id_excusa válido" });
    }

    excusa.destroy({
        where: { id_excusa }
    })
    .then(deleted => {
        if (deleted) {
            res.status(200).send({ message: "Excusa eliminada exitosamente" });
        } else {
            res.status(404).send({ message: "Excusa no encontrada" });
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al eliminar excusa" });
    });
}

// Actualizar una excusa
async function updateExcusa(req, res) {
    const { id_excusa, alumnoId, razon, archivo, fecha_solicitud, estado } = req.body;

    if (!id_excusa || !alumnoId || !razon || !archivo || !fecha_solicitud || !estado) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    excusa.update(
        { estado },
        { where: { id_excusa } }
    )
    .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
            res.status(200).send({ message: "Excusa actualizada exitosamente" });
        } else {
            res.status(404).send({ message: "Excusa no encontrada" });
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al actualizar excusa" });
    });
}

module.exports = {
    getExcusa,
    insertExcusa,
    deleteExcusa,
    updateExcusa
};