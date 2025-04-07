import { useState, ChangeEvent, useEffect } from 'react';
import './ExcusaAlumnoScreen.css';
import ReasonOption from './ReasonOption';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
  message: string;
}

interface Clase {
  id_clase: number;
  nombre_clase: string;
}

function ExcusaAlumnoScreen() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alumnoId, setAlumnoId] = useState<number | null>(null);
  const [clasesSeleccionadas, setClasesSeleccionadas] = useState<number[]>([]);
  const [clasesMatriculadas, setClasesMatriculadas] = useState<Clase[]>([]);
  const navigate = useNavigate();

  // Diccionario con imágenes por razón
  const imagenesRazon: Record<string, string> = {
    Enfermedad: "https://i.postimg.cc/3J052qVw/image-removebg-preview-55.png",
    Luto: "https://i.postimg.cc/T1ZskRF3/image-removebg-preview-67.png",
    Viaje: "https://i.postimg.cc/vB2kV7v9/image-removebg-preview-66.png",
    Otro: "https://i.postimg.cc/5tnkh5TG/image-removebg-preview-68.png",
  };

  useEffect(() => {
    const storedAlumnoId = sessionStorage.getItem('alumnoId');
    if (storedAlumnoId) {
      const alumnoIdNumber = Number(storedAlumnoId);
      setAlumnoId(alumnoIdNumber);

      axios
        .get<Clase[]>(`http://localhost:3008/api/unicah/matriculaAlumno/getClasesAlumno/${alumnoIdNumber}`)
        .then(res => setClasesMatriculadas(res.data))
        .catch(err => console.error('Error cargando clases matriculadas:', err));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleReasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setClasesSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!selectedReason || !description || clasesSeleccionadas.length === 0) {
      alert('Por favor, completa todos los campos y selecciona al menos una clase.');
      return;
    }

    if (!alumnoId) {
      alert('No se ha identificado al alumno. Vuelve a iniciar sesión.');
      return;
    }

    const formData = new FormData();
    formData.append('alumnoId', alumnoId.toString());
    formData.append('razon', selectedReason);
    formData.append('descripcion', description);
    const clasesSinEspacios = clasesSeleccionadas.map(claseId => String(claseId).trim());
    formData.append('clases', JSON.stringify(clasesSinEspacios));
    if (selectedFile) {
      formData.append('archivo', selectedFile);
    }

    try {
      const response = await axios.post<ApiResponse>(
        'http://localhost:3008/api/unicah/excusa/insertExcusa',
        formData
      );

      alert(response.data.message);
      setSelectedReason(null);
      setDescription('');
      setSelectedFile(null);
      setClasesSeleccionadas([]);
    } catch (error) {
      console.error('Error al enviar la excusa:', error);
      alert('Ocurrió un error al enviar la excusa.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container-fluid shadow p-4 bg-white rounded text-center">
        <h2 className="text-primary">SISTEMA DE EXCUSAS UNICAH</h2>
        <img
          src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png"
          alt="Escudo UNICAH"
          className="img-fluid mb-3"
          width="120"
        />
        <h3>BIENVENIDO</h3>
        <div className="alert alert-primary mt-3">SELECCIONA UNA RAZÓN</div>

        <div className="d-flex flex-wrap justify-content-around">
          {['Enfermedad', 'Luto', 'Viaje', 'Otro'].map((razon) => (
            <ReasonOption
              key={razon}
              value={razon}
              label={razon}
              imageUrl={imagenesRazon[razon]}
              name="reason"
              onChange={handleReasonChange}
              checked={selectedReason === razon}
            />
          ))}
        </div>

        <div className="mt-3 text-start">
          <label htmlFor="description" className="form-label">Describe la inasistencia:</label>
          <textarea
            id="description"
            className="form-control"
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-3 text-start">
          <label className="form-label">Selecciona las clases a las que aplica la excusa:</label>
          {clasesMatriculadas.map(clase => (
            <div key={clase.id_clase} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={clase.id_clase}
                checked={clasesSeleccionadas.includes(clase.id_clase)}
                onChange={() => handleCheckboxChange(clase.id_clase)}
                id={`clase-${clase.id_clase}`}
              />
              <label className="form-check-label" htmlFor={`clase-${clase.id_clase}`}>
                {clase.nombre_clase} ({clase.id_clase})
              </label>
            </div>
          ))}
          {clasesMatriculadas.length === 0 && (
            <p className="text-muted">No estás matriculado en ninguna clase activa.</p>
          )}
        </div>

        <div className="mt-3 text-start">
          <label htmlFor="file-upload" className="form-label">Adjuntar documento de respaldo:</label>
          <input
            type="file"
            id="file-upload"
            className="form-control"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg"
          />
          {selectedFile && (
            <p className="mt-2 text-success">Archivo seleccionado: {selectedFile.name}</p>
          )}
        </div>

        <button className="btn btn-primary mt-3" onClick={handleSubmit}>ENVIAR</button>
      </div>
    </div>
  );
}

export default ExcusaAlumnoScreen;
