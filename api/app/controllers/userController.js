'use strict';

const { result } = require('lodash');
// Importa la configuración de la base de datos y el modelo de usuario.
const db = require('../config/db');
const user = db.user;


/**
 * Obtiene todos los usuarios de la base de datos.
 */


async function getUser(req, res) {
    try {
        // Busca todos los usuarios en la base de datos.
        const users = await user.findAll();
        // Responde con un código de estado 200 (OK) y la lista de usuarios en formato JSON.
        res.status(200).json(users);
    } catch (error) {
        // Si ocurre un error, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error.
        res.status(500).json({ message: error.message || "Sucedió un error inesperado" });
    }
}

/**
 * Inserta un nuevo usuario en la base de datos.
 */
async function insertUser(req, res) {
    // Extrae los campos userId, pass y roleId del cuerpo de la solicitud.
    const { userId, pass, roleId } = req.body;

    // Verifica si todos los campos requeridos están presentes.
    if (!userId || !pass || !roleId) {
        // Si falta algún campo, responde con un código de estado 400 (Solicitud incorrecta) y un mensaje de error.
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Crea un nuevo usuario en la base de datos con los datos proporcionados.
        const newUser = await user.create({ userId, pass, roleId });
        // Responde con un código de estado 201 (Creado) y un mensaje de éxito, incluyendo el nuevo usuario creado.
        res.status(201).send({ message: "Usuario creado exitosamente", newUser });
    } catch (error) {
        // Si ocurre un error, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error.
        res.status(500).send({ message: error.message || "Error al insertar usuario" });
    }
}

/**
 * Actualiza un usuario existente en la base de datos.
 */
async function updateUser(req, res) {
    // Extrae los campos userId, pass y roleId del cuerpo de la solicitud.
    const { userId, pass, roleId } = req.body;

    // Verifica si todos los campos requeridos están presentes.
    if (!userId || !pass || !roleId) {
        // Si falta algún campo, responde con un código de estado 400 (Solicitud incorrecta) y un mensaje de error.
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Actualiza el usuario en la base de datos con los datos proporcionados.
        const [rowsUpdated] = await user.update(
            { pass, roleId },
            { where: { userId } }
        );

        // Verifica si se actualizó alguna fila.
        if (rowsUpdated > 0) {
            // Si se actualizó, responde con un código de estado 200 (OK) y un mensaje de éxito.
            res.status(200).send({ message: "Usuario actualizado exitosamente" });
        } else {
            // Si no se encontró el usuario, responde con un código de estado 404 (No encontrado) y un mensaje de error.
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        // Si ocurre un error, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error.
        res.status(500).send({ message: error.message || "Error al actualizar usuario" });
    }
}

/**
 * Elimina un usuario de la base de datos.
 */
async function deleteUser(req, res) {
    // Extrae el campo userId del cuerpo de la solicitud.
    const { userId } = req.body;

    // Verifica si el campo userId está presente.
    if (!userId) {
        // Si falta el campo userId, responde con un código de estado 400 (Solicitud incorrecta) y un mensaje de error.
        return res.status(400).send({ message: "Se requiere un userId válido" });
    }

    try {
        // Elimina el usuario de la base de datos.
        const deleted = await user.destroy({ where: { userId } });

        // Verifica si se eliminó alguna fila.
        if (deleted) {
            // Si se eliminó, responde con un código de estado 200 (OK) y un mensaje de éxito.
            res.status(200).send({ message: "Usuario eliminado exitosamente" });
        } else {
            // Si no se encontró el usuario, responde con un código de estado 404 (No encontrado) y un mensaje de error.
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        // Si ocurre un error, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error.
        res.status(500).send({ message: error.message || "Error al eliminar usuario" });
    }
}

async function login(req, res) {
    const { userId, pass } = req.body;

    if (!userId || !pass) {
        return res.status(400).json({ message: "Usuario y contraseña requeridos" });
    }

    try {
        const userFound = await user.findOne({ where: { userId, pass } });

        if (!userFound) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Buscar el alumno correspondiente (si existe)
        const alumno = await db.alumno.findOne({ where: { userId } });

        const responseData = {
            message: "Inicio de sesión exitoso",
            user: userFound,
            alumnoId: alumno?.alumnoId || null // si no es alumno, se manda null
        };

        return res.status(200).json(responseData);
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
}

// Exporta las funciones para que puedan ser utilizadas en otras partes de la aplicación.
module.exports = {
    getUser,
    insertUser,
    updateUser,
    deleteUser,
    login
};
