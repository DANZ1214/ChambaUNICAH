'use strict';

const db = require('../config/db');
const matricula = db.matricula;
const clase = db.clase;

async function getClasesAlumno(req, res) {
    const { alumnoId } = req.params; // Obtener el ID del alumno de los parámetros de la ruta

    if (!alumnoId) {
        return res.status(400).send({ message: "Se requiere el ID del alumno" });
    }

    try {
        const matriculasAlumno = await matricula.findAll({
            where: { alumnoId: alumnoId, estado: 'activo' },
            include: [{
                model: clase,
                as: 'clase', // Usar el alias definido en db.js
                attributes: ['id_clase', 'nombre_clase'] // Incluir solo los atributos necesarios de la clase
            }]
        });

        const clasesMatriculadas = matriculasAlumno.map(m => m.clase);
        res.status(200).json(clasesMatriculadas);
    } catch (error) {
        console.error("Error al obtener las clases del alumno:", error);
        res.status(500).send({ message: error.message || "Error al obtener las clases del alumno" });
    }
}

async function getClasesDocente(req, res) {
  const { docenteId } = req.params;
  try {
    const clases = await db.matricula.findAll({
      where: { docenteId },
      include: [{ model: db.clase, as: 'clase' }]
    });
    res.status(200).json(clases.map(m => m.clase));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
    getClasesAlumno,
    getClasesDocente
};