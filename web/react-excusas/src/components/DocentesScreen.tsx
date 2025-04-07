import { useEffect, useState } from 'react';
import axios from 'axios';
import './DocentesScreen.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Excusa {
  id: number;
  alumno: {
    nombre: string;
  };
  motivo: string;
  fecha: string;
  clases: string[];
}

interface ClaseDocente {
  id_clase: number;
  codigo_clase: string;
  nombre_clase: string;
}

const DocenteScreen = () => {
  const navigate = useNavigate();
  const [excusas, setExcusas] = useState<Excusa[]>([]);
  const [clasesDocente, setClasesDocente] = useState<ClaseDocente[]>([]);
  const [selectedClases, setSelectedClases] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const docenteId = sessionStorage.getItem('docenteId');

  useEffect(() => {
    if (!docenteId) {
      setModalMessage('No se ha identificado al docente. Vuelve a iniciar sesión.');
      setShowModal(true);
      return;
    }

    const docenteIdNumber = Number(docenteId);
    
    // Cargar clases del docente
    axios.get<ClaseDocente[]>(`http://localhost:3008/api/unicah/docente/getClasesDocente/${docenteIdNumber}`)
      .then(res => setClasesDocente(res.data))
      .catch(err => {
        console.error('Error cargando clases del docente:', err);
        setModalMessage('Error al cargar las clases asignadas');
        setShowModal(true);
      });

    // Cargar excusas específicas del docente
    axios.get<Excusa[]>(`http://localhost:3008/api/unicah/excusa/getExcusasDocente/${docenteIdNumber}`)
      .then(res => setExcusas(res.data))
      .catch(err => {
        console.error('Error al cargar excusas:', err);
        setModalMessage('Error al cargar las excusas');
        setShowModal(true);
      });
  }, []);

  const handleClaseChange = (codigoClase: string) => {
    setSelectedClases(prev =>
      prev.includes(codigoClase)
        ? prev.filter(c => c !== codigoClase)
        : [...prev, codigoClase]
    );
  };

  const filteredExcusas = excusas.filter(excusa =>
    selectedClases.length === 0 ||
    excusa.clases.some(clase => selectedClases.includes(clase))
  );

  const handleCloseModal = () => {
    setShowModal(false);
    if (!docenteId) navigate('/login');
  };

  return (
    <div className="container-fluid vh-100 w-100 d-flex flex-column p-4 bg-white">
      <div className="text-center mb-4">
        <img
          src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png"
          alt="Logo Unicah"
          className="img-fluid"
          width="150"
        />
        <h2 className="text-primary">SISTEMA DE EXCUSAS UNICAH - VISTA DOCENTE</h2>
      </div>

      <div className="card shadow-lg p-4 mb-4">
        <h4 className="text-secondary mb-3">Filtrar por clases asignadas:</h4>
        <div className="row">
          {clasesDocente.map(clase => (
            <div key={clase.id_clase} className="col-md-4 mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`clase-${clase.id_clase}`}
                  checked={selectedClases.includes(clase.codigo_clase)}
                  onChange={() => handleClaseChange(clase.codigo_clase)}
                />
                <label className="form-check-label" htmlFor={`clase-${clase.id_clase}`}>
                  {clase.nombre_clase} ({clase.codigo_clase})
                </label>
              </div>
            </div>
          ))}
          {clasesDocente.length === 0 && (
            <div className="col-12">
              <p className="text-muted">No tienes clases asignadas actualmente.</p>
            </div>
          )}
        </div>
      </div>

      <div className="card shadow-lg p-4">
        <h3 className="text-primary mb-4">Excusas Recibidas</h3>
        
        {filteredExcusas.length === 0 ? (
          <div className="alert alert-info">
            No hay excusas {selectedClases.length > 0 ? 'para las clases seleccionadas' : 'registradas'}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Alumno</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                  <th>Clases afectadas</th>
                </tr>
              </thead>
              <tbody>
                {filteredExcusas.map((excusa) => (
                  <tr key={excusa.id}>
                    <td>{excusa.alumno?.nombre || 'Nombre no disponible'}</td>
                    <td>{excusa.motivo}</td>
                    <td>{new Date(excusa.fecha).toLocaleDateString()}</td>
                    <td>{excusa.clases?.join(', ')}</td>
                  </tr>
                ))}
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