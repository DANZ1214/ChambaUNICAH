'use strict';

const db = require('../config/db');
const excusa = db.excusa;
const excusaClase = db.excusaClase;

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
    const { razon, descripcion, alumnoId } = req.body;
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

    try {
        const result = await excusa.create({ alumnoId, razon, archivo, descripcion });

        // Guardar las clases asociadas a la excusa
        if (clases && Array.isArray(clases) && clases.length > 0) {
            const clasesAGuardar = clases.map(claseId => ({
                id_excusa: result.id_excusa,
                id_clase: claseId
            }));
            await excusaClase.bulkCreate(clasesAGuardar);
        }

        res.status(201).send({ message: "Excusa creada exitosamente", result });
    } catch (error) {
        console.error("Error al insertar excusa:", error);
        res.status(500).send({ message: error.message || "Error al insertar excusa" });
    }
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
    const { id_excusa, estado } = req.body;

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
