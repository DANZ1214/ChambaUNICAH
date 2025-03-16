'use strict';

const db = require('../config/db');
const user = db.user;

async function getUser(req, res) {
    try {
        const users = await user.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message || "Sucedió un error inesperado" });
    }
}

async function insertUser(req, res) {
    const { userId, pass, roleId } = req.body;

    if (!userId || !pass || !roleId) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        const newUser = await user.create({ userId, pass, roleId });
        res.status(201).send({ message: "Usuario creado exitosamente", newUser });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al insertar usuario" });
    }
}


// Actualizar un usuario existente
async function updateUser(req, res) {
    const { userId, pass, roleId } = req.body;

    if (!userId || !pass || !roleId) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" });
    }

    try {
        const [rowsUpdated] = await user.update(
            { pass, roleId },
            { where: { userId } }
        );

        if (rowsUpdated > 0) {
            res.status(200).send({ message: "Usuario actualizado exitosamente" });
        } else {
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error al actualizar usuario" });
    }
}

//Eliminar usuario
async function deleteUser(req, res) {
    const { userId } = req.body; // Obtener el ID desde el cuerpo de la solicitud

    if (!userId) {
        return res.status(400).send({ message: "Se requiere un userId válido" });
    }

    try {
        const deleted = await user.destroy({ where: { userId } });

        if (deleted) {
            res.status(200).send({ message: "Usuario eliminado exitosamente" });
        } else {
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
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

        if (userFound) {
            res.status(200).json({ message: "Inicio de sesión exitoso", user: userFound });
        } else {
            res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
}


module.exports = {
    getUser,
    insertUser,
    updateUser,
    deleteUser,
    login
};
