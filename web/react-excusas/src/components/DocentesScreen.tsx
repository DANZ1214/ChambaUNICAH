import { useEffect, useState } from 'react';
import axios from 'axios';
import './DocentesScreen.css';
import { Modal, Button } from 'react-bootstrap';

interface Excusa {
  id: number;
  alumno: {
    nombre: string;
  };
  motivo: string;
  fecha: string;
  clases: number[]; // Cambiado a número para coincidir con id_clase
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

  // Convertir docenteId a número
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
        // Obtener clases del docente
        const clasesResponse = await axios.get<ClaseDocente[]>(
          `http://localhost:3008/api/unicah/matriculaAlumno/getClasesDocente/${docenteId}`
        );
        setClasesDocente(clasesResponse.data);

        // Obtener excusas del docente
        const excusasResponse = await axios.get<Excusa[]>(
          `http://localhost:3008/api/unicah/excusa/getExcusasDocente/${docenteId}`
        );
        setExcusas(excusasResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
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
      prev.includes(idClase)
        ? prev.filter(c => c !== idClase)
        : [...prev, idClase]
    );
  };

  const filteredExcusas = excusas.filter(excusa =>
    selectedClases.length === 0 ||
    excusa.clases.some(claseId => selectedClases.includes(claseId))
  );

  const handleCloseModal = () => setShowModal(false);

  if (isLoading) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-3">Cargando datos...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100 p-4 bg-white">
      <div className="text-center mb-4">
        <img
          src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png"
          alt="Logo Unicah"
          className="img-fluid"
          width="150"
        />
        <h2 className="text-primary">SISTEMA DE EXCUSAS UNICAH - VISTA DOCENTE</h2>
      </div>

      {/* Sección de Clases Asignadas */}
      <div className="card shadow p-4 mb-4">
        <h4 className="text-secondary mb-3">Clases Asignadas</h4>
        {clasesDocente.length > 0 ? (
          <>
            <p className="text-muted mb-3">Selecciona las clases para filtrar excusas:</p>
            <div className="row">
              {clasesDocente.map(clase => (
                <div key={clase.id_clase} className="col-md-4 mb-3">
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

      {/* Sección de Excusas */}
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary m-0">Excusas Recibidas</h3>
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
              : 'No hay excusas registradas para tus clases'}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Alumno</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                  <th>Clases Afectadas</th>
                </tr>
              </thead>
              <tbody>
                {filteredExcusas.map(excusa => (
                  <tr key={excusa.id}>
                    <td>{excusa.alumno?.nombre || 'Nombre no disponible'}</td>
                    <td>{excusa.motivo}</td>
                    <td>{new Date(excusa.fecha).toLocaleDateString('es-HN')}</td>
                    <td>
                      {excusa.clases.map(claseId => {
                        const clase = clasesDocente.find(c => c.id_clase === claseId);
                        return clase 
                          ? `${clase.nombre_clase} (${clase.id_clase})` 
                          : 'Clase no identificada';
                      }).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Notificaciones */}
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