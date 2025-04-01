import React, { useState, ChangeEvent } from 'react';
import './ExcusaAlumnoScreen.css';
import ReasonOption from './ReasonOption';

function ExcusaAlumnoScreen() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container-fluid shadow p-4 bg-white rounded text-center">
        <h2 className="text-primary">SISTEMA DE EXCUSAS UNICAH</h2>
        <img src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png" alt="Escudo UNICAH" className="img-fluid mb-3" width="120" />
        <h3>BIENVENIDO</h3>

        <div className="alert alert-primary mt-3">SELECCIONA UNA RAZÓN</div>
        <div className="d-flex flex-wrap justify-content-around">
          <ReasonOption
            value="Enfermedad"
            label="Enfermedad"
            imageUrl="https://i.postimg.cc/3J052qVw/image-removebg-preview-55.png"
            name="reason"
            onChange={handleReasonChange}
            checked={selectedReason === 'Enfermedad'}
            style={{ marginRight: '20px' }}
          />
          <ReasonOption
            value="Luto"
            label="Luto"
            imageUrl="https://i.postimg.cc/T1ZskRF3/image-removebg-preview-67.png"
            name="reason"
            onChange={handleReasonChange}
            checked={selectedReason === 'Luto'}
            style={{ marginRight: '20px' }}
          />
          <ReasonOption
            value="Viaje"
            label="Viaje"
            imageUrl="https://i.postimg.cc/vB2kV7v9/image-removebg-preview-66.png"
            name="reason"
            onChange={handleReasonChange}
            checked={selectedReason === 'Viaje'}
            style={{ marginRight: '20px' }}
          />
          <ReasonOption
            value="Otro"
            label="Otro"
            imageUrl="https://i.postimg.cc/5tnkh5TG/image-removebg-preview-68.png"
            name="reason"
            onChange={handleReasonChange}
            checked={selectedReason === 'Otro'}
            style={{ marginRight: '20px' }}
          />
        </div>

        <div className="mt-3 text-start">
          <label htmlFor="description" className="form-label">Describe la inasistencia:</label>
          <textarea
            id="description"
            className="form-control"
            rows={3}
            required
            value={description} // Agrega esta línea para controlar el valor del textarea
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(event.target.value);
              console.log('Descripción actual:', event.target.value);
            }}
          ></textarea>
        </div>

        <div className="mt-3">
          <label htmlFor="fileInput" className="form-label">Seleccionar archivo (opcional):</label>
          <input type="file" id="fileInput" className="form-control" name="archivo" />
        </div>

        <button className="btn btn-primary mt-3">ENVIAR</button>
      </div>
    </div>
  );
}

export default ExcusaAlumnoScreen;