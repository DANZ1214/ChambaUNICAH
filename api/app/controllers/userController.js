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

module.exports = {
    getUser
};
