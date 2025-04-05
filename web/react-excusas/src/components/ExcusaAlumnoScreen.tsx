import { useState, ChangeEvent, useEffect } from 'react';
import './ExcusaAlumnoScreen.css';
import ReasonOption from './ReasonOption';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
  message: string;
}

function ExcusaAlumnoScreen() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alumnoId, setAlumnoId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAlumnoId = sessionStorage.getItem('alumnoId');
    if (storedAlumnoId) {
      setAlumnoId(Number(storedAlumnoId));
    } else {
      navigate('/'); // Redirigir al login si no hay alumnoId
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

  const handleSubmit = async () => {
    if (!selectedReason || !description) {
      alert('Por favor, completa todos los campos.');
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
    if (selectedFile) {
      formData.append('archivo', selectedFile);
    }

    try {
      const response = await axios.post<ApiResponse>(
        'http://localhost:3008/api/unicah/excusa/insertExcusa',  // Ruta corregida
        formData
      );

      alert(response.data.message);
      setSelectedReason(null);
      setDescription('');
      setSelectedFile(null);
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
              imageUrl={`https://i.postimg.cc/.../${razon}.png`} // Puedes poner URLs según cada razón
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
