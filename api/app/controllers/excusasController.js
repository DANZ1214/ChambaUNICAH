'use strict';

const db = require('../config/db');
const excusa = db.excusa;

async function getExcusa(req, res) {
    excusa.findAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ message: error.message || "Sucedió un error inesperado" });
        });
}

async function insertExcusa(req, res) {
    const { razon, descripcion, alumnoId } = req.body; // Obtiene el alumnoId del cuerpo de la petición
    const archivo = req.file ? req.file.filename : null;

    if (!alumnoId) {
        return res.status(400).send({ message: "El ID del alumno es obligatorio" });
    }
    if (!razon) {
        return res.status(400).send({ message: "La razón es obligatoria" });
    }
    if (!descripcion) {
        return res.status(400).send({ message: "La descripción es obligatoria" });
    }

    excusa.create({ alumnoId, razon, archivo, descripcion })
    .then(result => {
        res.status(201).send({ message: "Excusa creada exitosamente", result });
    })
    // .catch(error => {
    //     res.status(500).send({ message: error.message || "Error al insertar excusa", error: error.errors });
    // });
    .catch(error => {
        console.error("Error al insertar excusa:", error); // Log del error en la consola del servidor
        res.status(500).send({ message: error.message || "Error al insertar excusa" });
    });
}

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

async function updateExcusa(req, res) {
    const { id_excusa, estado } = req.body; // Solo permitimos actualizar el estado por ahora

    if (!id_excusa || !estado) {
        return res.status(400).send({ message: "El ID de la excusa y el nuevo estado son obligatorios" });
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