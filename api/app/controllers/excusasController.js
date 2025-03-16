'use strict';

// Importa la configuración de la base de datos y el modelo de excusa.
const db = require('../config/db');
const excusa = db.excusa;

/**
 * Obtiene todas las excusas de la base de datos. 
 */
async function getExcusa(req, res) {
    excusa.findAll()
        .then(result => {
            // Responde con un código de estado 200 (OK) y la lista de excusas en formato JSON.
            res.status(200).json(result);
        })
        .catch(error => {
            // Si ocurre un error, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error.
            res.status(500).json({ message: error.message || "Sucedió un error inesperado" });
        });
}

/**
 * Inserta una nueva excusa en la base de datos. 
 */
async function insertExcusa(req, res) {
    const { id_excusa, alumnoId, razon, fecha_solicitud, estado } = req.body;
    const archivo = req.body.archivo || null; // Si no se envía, será null

    if (!razon) {
        return res.status(400).send({ message: "La razón es obligatoria" });
    }

    excusa.create({ id_excusa, alumnoId, razon, archivo, fecha_solicitud, estado })
    .then(result => {
        res.status(201).send({ message: "Excusa creada exitosamente", result });
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Error al insertar excusa" });
    });
}


/**
 * Elimina una excusa de la base de datos. 
 */
async function deleteExcusa(req, res) {
    // Extrae el campo id_excusa del cuerpo de la solicitud.
    const { id_excusa } = req.body;

    // Verifica si el campo id_excusa está presente.
    if (!id_excusa) {
        // Si falta el campo id_excusa, responde con un código de estado 400 (Solicitud incorrecta) y un mensaje de error.
        return res.status(400).send({ message: "Se requiere un id_excusa válido" });
    }

    excusa.destroy({
        where: { id_excusa }
    })
        .then(deleted => {
            // Verifica si se eliminó alguna fila.
            if (deleted) {
                // Si se eliminó, responde con un código de estado 200 (OK) y un mensaje de éxito.
                res.status(200).send({ message: "Excusa eliminada exitosamente" });
            } else {
                // Si no se encontró la excusa, responde con un código de estado 404 (No encontrado) y un mensaje de error.
                res.status(404).send({ message: "Excusa no encontrada" });
            }
        })
        .catch(error => {
            // Si ocurre un error, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error.
            res.status(500).send({ message: error.message || "Error al eliminar excusa" });
        });
}

/**
 * Actualiza una excusa existente en la base de datos.
 */
async function updateExcusa(req, res) {
    // Extrae los campos de la excusa del cuerpo de la solicitud.
    const { id_excusa, alumnoId, razon, archivo, fecha_solicitud, estado } = req.body;

    // Verifica si todos los campos requeridos están presentes.
    if (!id_excusa || !alumnoId || !razon || !archivo || !fecha_solicitud || !estado) {
        // Si falta algún campo, responde con un código de estado 400 (Solicitud incorrecta) y un mensaje de error.
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    excusa.update(
        { estado },
        { where: { id_excusa } }
    )
        .then(([rowsUpdated]) => {
            // Verifica si se actualizó alguna fila.
            if (rowsUpdated > 0) {
                // Si se actualizó, responde con un código de estado 200 (OK) y un mensaje de éxito.
                res.status(200).send({ message: "Excusa actualizada exitosamente" });
            } else {
                // Si no se encontró la excusa, responde con un código de estado 404 (No encontrado) y un mensaje de error.
                res.status(404).send({ message: "Excusa no encontrada" });
            }
        })
        .catch(error => {
            // Si ocurre un error, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error.
            res.status(500).send({ message: error.message || "Error al actualizar excusa" });
        });
}

// Exporta las funciones para que puedan ser utilizadas en otras partes de la aplicación.
module.exports = {
    getExcusa,
    insertExcusa,
    deleteExcusa,
    updateExcusa
};