'use strict';

const db = require('../config/db');
const Clase = db.clase;

// Obtener todas las clases
async function getClase(req, res) {
    try {
        const clases = await Clase.findAll();
        res.status(200).json(clases);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener clases" });
    }
}

// Insertar una nueva clase
async function insertClase(req, res) {
    const { id_clase, nombre_clase } = req.body;

    if (!id_clase || !nombre_clase) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        const nuevaClase = await Clase.create({ id_clase, nombre_clase });
        res.status(201).send({ message: "Clase creada exitosamente", nuevaClase });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al insertar clase" });
    }
}

// Actualizar una clase
async function updateClase(req, res) {
    const { id_clase, nombre_clase } = req.body;

    if (!id_clase || !nombre_clase) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        const [updated] = await Clase.update({ nombre_clase }, { where: { id_clase } });

        if (updated) {
            res.status(200).send({ message: "Clase actualizada exitosamente" });
        } else {
            res.status(404).send({ message: "Clase no encontrada" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al actualizar clase" });
    }
}

// Eliminar una clase
async function deleteClase(req, res) {
    const { id_clase } = req.body;

    if (!id_clase) {
        return res.status(400).send({ message: "Se requiere un id_clase válido" });
    }

    try {
        const deleted = await Clase.destroy({ where: { id_clase } });

        if (deleted) {
            res.status(200).send({ message: "Clase eliminada exitosamente" });
        } else {
            res.status(404).send({ message: "Clase no encontrada" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al eliminar clase" });
    }
}

module.exports = {
    getClase,
    insertClase,
    updateClase,
    deleteClase
};
