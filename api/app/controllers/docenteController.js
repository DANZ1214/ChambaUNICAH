'use strict';

// Importa la configuración de la base de datos
const db = require('../config/db');
const Docente = db.docente;

// Obtener todos los docentes
async function getDocente(req, res) {
    try {
        const docentes = await Docente.findAll();
        res.status(200).json(docentes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener docentes" });
    }
}

// Insertar un nuevo docente
async function insertDocente(req, res) {
    const { docenteId, email, nombre } = req.body;

    // Verifica que los campos obligatorios no estén vacíos
    if (!docenteId || !email || !nombre) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        const nuevoDocente = await Docente.create({ docenteId, email, nombre });
        res.status(201).send({ message: "Docente creado exitosamente", nuevoDocente });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al insertar docente" });
    }
}

// Actualizar un docente
async function updateDocente(req, res) {
    const { docenteId, email, nombre } = req.body;

    // Verifica que los campos obligatorios no estén vacíos
    if (!docenteId || !email || !nombre) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        const [updated] = await Docente.update({ email, nombre }, { where: { docenteId } });

        if (updated) {
            res.status(200).send({ message: "Docente actualizado exitosamente" });
        } else {
            res.status(404).send({ message: "Docente no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al actualizar docente" });
    }
}

// Eliminar un docente
async function deleteDocente(req, res) {
    const { docenteId } = req.body;

    // Verifica que los campos obligatorios no estén vacíos
    if (!docenteId) {
        return res.status(400).send({ message: "Se requiere un docenteId válido" });
    }

    try {
        const deleted = await Docente.destroy({ where: { docenteId } });

        if (deleted) {
            res.status(200).send({ message: "Docente eliminado exitosamente" });
        } else {
            res.status(404).send({ message: "Docente no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al eliminar docente" });
    }
}

// Exporta las funciones del controlador para su uso en las rutas.
module.exports = {
    getDocente,
    insertDocente,
    updateDocente,
    deleteDocente
};
