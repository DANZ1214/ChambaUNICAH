'use strict';

const db = require('../config/db');
const excusa = db.excusa;
const excusaClase = db.excusaClase;
const clase = db.clase;
const alumno = db.alumno;
const matricula = db.matricula;

async function getExcusa(req, res) {
    excusa.findAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ message: error.message || "Sucedió un error inesperado" });
        });
}


/**
 * Obtiene las excusas que están asociadas a las clases del docente.
 */
async function getExcusasDocente(req, res) {
    const { docenteId } = req.params;

    try {
        // Paso 1: obtener las clases asignadas al docente
        const clasesAsignadas = await db.matricula.findAll({
            where: { docenteId },
            attributes: ['id_clase']
        });

        const clasesIds = clasesAsignadas.map(c => c.id_clase);

        // Paso 2: obtener las excusas con alumno y clases asociadas
        const excusas = await db.excusa.findAll({
            include: [
                {
                    model: db.clase,
                    through: { attributes: [] }
                },
                {
                    model: db.alumno,
                    as: 'alumno',
                    attributes: ['alumnoId', 'nombre']
                }
            ]
        });

        // Paso 3: filtrar excusas que correspondan a clases del docente
        const excusasFiltradas = excusas.filter(excusa =>
            excusa.clases.some(clase => clasesIds.includes(clase.id_clase))
        );

        res.status(200).json(excusasFiltradas);

    } catch (error) {
        console.error("Error al obtener excusas del docente:", error);
        res.status(500).json({ message: error.message || "Error al obtener excusas" });
    }
}

  
  

async function insertExcusa(req, res) {
    const { razon, descripcion, alumnoId } = req.body;
    const archivo = req.file ? req.file.filename : null;
    let { clases } = req.body; // Declaramos 'clases' con 'let' para poder reasignarla

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
        if (clases) {
            try {
                clases = JSON.parse(clases); // Intentamos parsear la cadena JSON a un array
                if (Array.isArray(clases) && clases.length > 0) {
                    console.log("Clases recibidas y parseadas:", clases); // Log actualizado

                    const clasesAGuardar = clases.map(claseId => ({
                        id_excusa: result.id_excusa,
                        id_clase: claseId
                    }));

                    console.log("Clases a guardar en excusaClase:", clasesAGuardar);

                    await excusaClase.bulkCreate(clasesAGuardar);
                    console.log("Inserción en excusaClase completada");
                } else {
                    console.log("El array de clases parseado está vacío o no es un array.");
                }
            } catch (error) {
                console.error("Error al parsear el JSON de clases:", error);
                console.log("Valor de 'clases' recibido:", clases);
            }
        } else {
            console.log("No se recibieron clases para asociar.");
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
    console.log("UpdateExcusa BODY:", req.body); // 👈 Ver qué llega

    if (!id_excusa || !estado) {
        return res.status(400).send({ message: "El ID de la excusa y el nuevo estado son obligatorios" });
    }

    try {
        const [rowsUpdated] = await excusa.update(
            { estado },
            { where: { id_excusa } }
        );
        console.log("Rows updated:", rowsUpdated); // 👈 Ver si actualizó

        if (rowsUpdated > 0) {
            res.status(200).send({ message: "Excusa actualizada exitosamente" });
        } else {
            res.status(404).send({ message: "Excusa no encontrada" });
        }
    } catch (error) {
        console.error("Error actualizando excusa:", error); // 👈 Por si falla
        res.status(500).send({ message: error.message || "Error al actualizar excusa" });
    }
}


module.exports = {
    getExcusa,
    insertExcusa,
    deleteExcusa,
    updateExcusa,
    getExcusasDocente
};
