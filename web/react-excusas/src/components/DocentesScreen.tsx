import { useEffect, useState } from 'react';
import axios from 'axios';
import './DocentesScreen.css';
import { Modal, Button } from 'react-bootstrap';

interface Excusa {
  id_excusa: number;
  alumno: {
    nombre: string;
  };
  razon: string;
  descripcion: string;
  archivo?: string;
  fecha_solicitud: string;
  estado: string;
  clases: {
    id_clase: number;
    nombre_clase: string;
  }[];
}

interface ClaseDocente {
  id_clase: number;
  nombre_clase: string;
}

const DocenteScreen = () => {
  const [excusas, setExcusas] = useState<Excusa[]>([]);
  const [clasesDocente, setClasesDocente] = useState<ClaseDocente[]>([]);
  const [selectedClases, setSelectedClases] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const docenteId = sessionStorage.getItem('docenteId');
  const docenteIdNumber = docenteId ? Number(docenteId) : null;

  useEffect(() => {
    if (!docenteIdNumber || isNaN(docenteIdNumber)) {
      setModalMessage('No se ha identificado al docente. Vuelve a iniciar sesión.');
      setShowModal(true);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const clasesResponse = await axios.get<ClaseDocente[]>(
          `http://localhost:3008/api/unicah/matriculaAlumno/getClasesDocente/${docenteId}`
        );
        setClasesDocente(clasesResponse.data);

        const excusasResponse = await axios.get<Excusa[]>(
          `http://localhost:3008/api/unicah/excusa/getExcusasDocente/${docenteId}`
        );
        setExcusas(excusasResponse.data);
      } catch (error) {
        setModalMessage('Error al cargar los datos. Por favor, intenta nuevamente.');
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [docenteId]);

  const handleClaseChange = (idClase: number) => {
    setSelectedClases(prev =>
      prev.includes(idClase) ? prev.filter(c => c !== idClase) : [...prev, idClase]
    );
  };

  const handleEstadoUpdate = async (id_excusa: number, estado: string) => {
    try {
      await axios.put('http://localhost:3008/api/unicah/excusa/updateExcusa', {
        id_excusa,
        estado
      });

      setExcusas(prev =>
        prev.map(excusa =>
          excusa.id_excusa === id_excusa ? { ...excusa, estado } : excusa
        )
      );
    } catch (error) {
      setModalMessage('No se pudo actualizar el estado de la excusa');
      setShowModal(true);
    }
  };

  const filteredExcusas = selectedClases.length > 0
    ? excusas.filter(excusa =>
        excusa.clases.some(clase => selectedClases.includes(clase.id_clase))
      )
    : excusas;

  const handleCloseModal = () => setShowModal(false);

  if (isLoading) {
    return (
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-3">Cargando datos...</span>
      </div>
    );
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
              {clasesDocente.map(clase => (
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
          <div className="alert alert-warning">
            No tienes clases asignadas en este período académico.
          </div>
        )}
      </div>

      <div className="card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Excusas Recibidas</h4>
          {selectedClases.length > 0 && (
            <span className="badge bg-info">
              Filtrado: {selectedClases.length} clase(s) seleccionada(s)
            </span>
          )}
        </div>

        {filteredExcusas.length === 0 ? (
          <div className="alert alert-info">
            {selectedClases.length > 0
              ? 'No hay excusas para las clases seleccionadas'
              : 'No hay excusas registradas'}
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
                </tr>
              </thead>
              <tbody>
                {filteredExcusas.map(excusa =>
                  excusa.clases
                    .filter(clase => selectedClases.includes(clase.id_clase))
                    .map(clase => (
                      <tr key={`${excusa.id_excusa}-${clase.id_clase}`}>
                        <td>{excusa.alumno?.nombre || 'Nombre no disponible'}</td>
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
                            'Sin archivo'
                          )}
                        </td>
                        <td>{new Date(excusa.fecha_solicitud).toLocaleDateString('es-HN')}</td>
                        <td>{`${clase.nombre_clase} (${clase.id_clase})`}</td>
                        <td>
                          {excusa.estado === 'Pendiente' ? (
                            <>
                              <span className="badge bg-warning text-dark me-1">Pendiente</span>
                              <button
                                className="btn btn-success btn-sm me-1"
                                onClick={() => handleEstadoUpdate(excusa.id_excusa, 'Aprobado')}
                              >
                                Aprobar
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleEstadoUpdate(excusa.id_excusa, 'Rechazado')}
                              >
                                Rechazar
                              </button>
                            </>
                          ) : (
                            <span
                              className={`badge ${
                                excusa.estado === 'Aprobado' ? 'bg-success' : 'bg-danger'
                              }`}
                            >
                              {excusa.estado}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
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
  );
};

export default DocenteScreen;
