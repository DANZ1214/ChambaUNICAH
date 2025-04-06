import { useEffect, useState } from 'react';
import axios from 'axios';
import './DocenteScreen.css';

// Definir la interfaz de la Excusa
interface Excusa {
  id: number;
  alumno: {
    nombre: string;
  };
  motivo: string;
  fecha: string;
  clases: string[];
}

const DocenteScreen = () => {
  // Ahora el estado tiene el tipo Excusa[]
  const [excusas, setExcusas] = useState<Excusa[]>([]);

  useEffect(() => {
    axios.get<Excusa[]>('http://localhost:3001/api/excusas') // Especificamos que esperamos un arreglo de Excusa
      .then(res => setExcusas(res.data))
      .catch(err => console.error('Error al cargar excusas:', err));
  }, []);

  return (
    <div className="docente-container">
      <h2>Excusas Recibidas</h2>
      {excusas.length === 0 ? (
        <p>No hay excusas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Motivo</th>
              <th>Fecha</th>
              <th>Clases</th>
            </tr>
          </thead>
          <tbody>
            {excusas.map((excusa) => (
              <tr key={excusa.id}>
                <td>{excusa.alumno?.nombre || 'Sin nombre'}</td>
                <td>{excusa.motivo}</td>
                <td>{excusa.fecha}</td>
                <td>{excusa.clases?.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocenteScreen;
