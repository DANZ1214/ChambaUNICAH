"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import "./DocentesScreen.css"
import { Modal, Button } from "react-bootstrap"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface Excusa {
  id_excusa: number
  alumno: {
    nombre: string
  }
  razon: string
  descripcion: string
  archivo?: string
  fecha_solicitud: string
  estado: string
  clases: {
    id_clase: number
    nombre_clase: string
  }[]
}

interface ClaseDocente {
  id_clase: number
  nombre_clase: string
}

const DocenteScreen = () => {
  const [excusas, setExcusas] = useState<Excusa[]>([])
  const [clasesDocente, setClasesDocente] = useState<ClaseDocente[]>([])
  const [selectedClases, setSelectedClases] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Mover la lógica de obtener docenteId dentro del useEffect
  useEffect(() => {
    const docenteId = sessionStorage.getItem("docenteId")
    const docenteIdNumber = docenteId ? Number(docenteId) : null

    if (!docenteIdNumber || isNaN(docenteIdNumber)) {
      setModalMessage("No se ha identificado al docente. Vuelve a iniciar sesión.")
      setShowModal(true)
      setIsLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const clasesResponse = await axios.get<ClaseDocente[]>(
          `http://localhost:3008/api/unicah/matriculaAlumno/getClasesDocente/${docenteId}`,
        )
        setClasesDocente(clasesResponse.data)

        const excusasResponse = await axios.get<Excusa[]>(
          `http://localhost:3008/api/unicah/excusa/getExcusasDocente/${docenteId}`,
        )
        setExcusas(excusasResponse.data)
      } catch (error) {  
         console.error('Error al cargar datos:', error);
         setModalMessage("Error al cargar los datos. Por favor, intenta nuevamente.")
         setShowModal(true)
        } 
      finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, []) // Array de dependencias vacío ya que solo se ejecuta una vez al montar

  const handleClaseChange = (idClase: number) => {
    setSelectedClases((prev) => (prev.includes(idClase) ? prev.filter((c) => c !== idClase) : [...prev, idClase]))
  }

  const handleEstadoUpdate = async (id_excusa: number, estado: string) => {
    try {
      // Descomentar cuando tengas el endpoint funcionando
      // await axios.put("http://localhost:3008/api/unicah/excusa/updateExcusa", {
      //   id_excusa,
      //   estado,
      // })

      setExcusas((prev) => prev.map((excusa) => (excusa.id_excusa === id_excusa ? { ...excusa, estado } : excusa)))
    } catch (error) {
      console.error('Error al actualizar excusa:', error)
      setModalMessage("No se pudo actualizar el estado de la excusa")
      setShowModal(true)
    }
  }

  // Función para generar PDF de una excusa individual
  const generateExcusaPDF = (excusa: Excusa, clase: { id_clase: number; nombre_clase: string }) => {
    const doc = new jsPDF()

    // Añadir logo
    const logoUrl = "https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png"
    const img = new Image()
    img.src = logoUrl

    img.onload = () => {
      // Añadir logo centrado en la parte superior
      const imgWidth = 40
      const imgHeight = (img.height * imgWidth) / img.width
      doc.addImage(img, "PNG", (doc.internal.pageSize.width - imgWidth) / 2, 10, imgWidth, imgHeight)

      // Título
      doc.setFontSize(16)
      doc.setTextColor(0, 51, 102) // Color #003366
      doc.text("UNIVERSIDAD CATÓLICA DE HONDURAS", doc.internal.pageSize.width / 2, imgHeight + 20, { align: "center" })
      doc.text("DETALLE DE EXCUSA ACADÉMICA", doc.internal.pageSize.width / 2, imgHeight + 30, { align: "center" })

      // Información de la excusa
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)

      const startY = imgHeight + 40
      const lineHeight = 8

      // Datos del estudiante y clase
      doc.setFont("helvetica", "bold")
      doc.text("Información General:", 20, startY)
      doc.setFont("helvetica", "normal")
      doc.text(`Estudiante: ${excusa.alumno?.nombre || "No disponible"}`, 20, startY + lineHeight)
      doc.text(`Clase: ${clase.nombre_clase} (${clase.id_clase})`, 20, startY + lineHeight * 2)
      doc.text(
        `Fecha de Solicitud: ${new Date(excusa.fecha_solicitud).toLocaleDateString("es-HN")}`,
        20,
        startY + lineHeight * 3,
      )

      // Estado con color
      doc.setFont("helvetica", "bold")
      doc.text("Estado:", 20, startY + lineHeight * 4)

      // Cambiar color según estado
      if (excusa.estado === "Aprobado") {
        doc.setTextColor(40, 167, 69) // verde
      } else if (excusa.estado === "Rechazado") {
        doc.setTextColor(220, 53, 69) // rojo
      } else {
        doc.setTextColor(255, 193, 7) // amarillo
      }

      doc.setFont("helvetica", "normal")
      doc.text(excusa.estado, 50, startY + lineHeight * 4)

      // Resetear color
      doc.setTextColor(0, 0, 0)

      // Detalles de la excusa
      doc.setFont("helvetica", "bold")
      doc.text("Detalles de la Excusa:", 20, startY + lineHeight * 6)
      doc.setFont("helvetica", "normal")
      doc.text(`Motivo: ${excusa.razon}`, 20, startY + lineHeight * 7)

      // Descripción con texto largo (con saltos de línea automáticos)
      const splitDescription = doc.splitTextToSize(excusa.descripcion, 170)
      doc.text("Descripción:", 20, startY + lineHeight * 8)
      doc.text(splitDescription, 20, startY + lineHeight * 9)

      // Información de archivo adjunto
      const archivoY = startY + lineHeight * (9 + splitDescription.length)
      doc.setFont("helvetica", "bold")
      doc.text("Archivo Adjunto:", 20, archivoY)
      doc.setFont("helvetica", "normal")
      doc.text(excusa.archivo ? "Sí (disponible en el sistema)" : "No adjuntado", 20, archivoY + lineHeight)

      // Pie de página
      const pageHeight = doc.internal.pageSize.height
      doc.setFontSize(10)
      doc.setTextColor(128, 128, 128)
      doc.text(
        "Documento generado por el Sistema de Excusas UNICAH",
        doc.internal.pageSize.width / 2,
        pageHeight - 10,
        { align: "center" },
      )

      // Guardar PDF
      doc.save(`Excusa_${excusa.id_excusa}_${clase.id_clase}.pdf`)
    }

    img.onerror = () => {
      // Si falla la carga del logo, continuar sin él
      doc.setFontSize(16)
      doc.setTextColor(0, 51, 102)
      doc.text("UNIVERSIDAD CATÓLICA DE HONDURAS", doc.internal.pageSize.width / 2, 20, { align: "center" })
      doc.text("DETALLE DE EXCUSA ACADÉMICA", doc.internal.pageSize.width / 2, 30, { align: "center" })

      // Resto del código igual...
      doc.save(`Excusa_${excusa.id_excusa}_${clase.id_clase}.pdf`)
    }
  }

  const filteredExcusas =
    selectedClases.length > 0
      ? excusas.filter((excusa) => excusa.clases.some((clase) => selectedClases.includes(clase.id_clase)))
      : excusas

  const handleCloseModal = () => setShowModal(false)

  if (isLoading) {
    return (
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-3">Cargando datos...</span>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="text-center mb-4">
        <img
          src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png"
          alt="Logo Unicah"
          className="img-fluid"
          width="150"
        />
        <h2 className="mt-3">UNICAH - VISTA DOCENTE</h2>
      </div>

      {/* ✅ Card con clases asignadas no se colapsa */}
      <div className="card card-clases">
        <h4 className="mb-3">Clases Asignadas</h4>
        {clasesDocente.length > 0 ? (
          <>
            <p className="text-muted">Selecciona las clases para filtrar excusas:</p>
            <div className="row">
              {clasesDocente.map((clase) => (
                <div key={clase.id_clase} className="col-md-6 col-lg-4 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`clase-${clase.id_clase}`}
                      checked={selectedClases.includes(clase.id_clase)}
                      onChange={() => handleClaseChange(clase.id_clase)}
                    />
                    <label className="form-check-label" htmlFor={`clase-${clase.id_clase}`}>
                      <strong>{clase.id_clase}</strong> - {clase.nombre_clase}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="alert alert-warning">No tienes clases asignadas en este período académico.</div>
        )}
      </div>

      <div className="card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Excusas Recibidas</h4>
          {selectedClases.length > 0 && (
            <span className="badge bg-info">Filtrado: {selectedClases.length} clase(s) seleccionada(s)</span>
          )}
        </div>

        {filteredExcusas.length === 0 ? (
          <div className="alert alert-info">
            {selectedClases.length > 0 ? "No hay excusas para las clases seleccionadas" : "No hay excusas registradas"}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-custom">
              <thead className="table-dark text-center align-middle">
                <tr>
                  <th>Alumno</th>
                  <th>Motivo</th>
                  <th>Descripción</th>
                  <th>Archivo</th>
                  <th>Fecha</th>
                  <th>Clase Afectada</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredExcusas.map((excusa) =>
                  excusa.clases
                    .filter((clase) => selectedClases.length === 0 || selectedClases.includes(clase.id_clase))
                    .map((clase) => (
                      <tr key={`${excusa.id_excusa}-${clase.id_clase}`}>
                        <td>{excusa.alumno?.nombre || "Nombre no disponible"}</td>
                        <td>{excusa.razon}</td>
                        <td>{excusa.descripcion}</td>
                        <td>
                          {excusa.archivo ? (
                            <a
                              href={`http://localhost:3008/uploads/${excusa.archivo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver archivo
                            </a>
                          ) : (
                            "Sin archivo"
                          )}
                        </td>
                        <td>{new Date(excusa.fecha_solicitud).toLocaleDateString("es-HN")}</td>
                        <td>{`${clase.nombre_clase} (${clase.id_clase})`}</td>
                        <td>
                          {excusa.estado === "Pendiente" ? (
                            <>
                              <span className="badge bg-warning text-dark me-1">Pendiente</span>
                              <button
                                className="btn btn-success btn-sm me-1"
                                onClick={() => handleEstadoUpdate(excusa.id_excusa, "Aprobado")}
                              >
                                Aprobar
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleEstadoUpdate(excusa.id_excusa, "Rechazado")}
                              >
                                Rechazar
                              </button>
                            </>
                          ) : (
                            <span className={`badge ${excusa.estado === "Aprobado" ? "bg-success" : "bg-danger"}`}>
                              {excusa.estado}
                            </span>
                          )}
                        </td>
                        <td>
                          {/* Botón para generar PDF individual */}
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => generateExcusaPDF(excusa, clase)}
                            style={{ backgroundColor: "#00bcd4", borderColor: "#00bcd4" }}
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                    )),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DocenteScreen