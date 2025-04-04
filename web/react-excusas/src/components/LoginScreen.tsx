import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScreen.css';

const LoginScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setErrorMensaje('');

    try {
      const response = await fetch('http://localhost:3008/api/unicah/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: usuario, pass: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        sessionStorage.setItem('alumnoId', data.alumnoId);
        navigate('/excusa-alumno'); // Redirige a la pantalla de excusas
      } else {
        setErrorMensaje(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setErrorMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container-fluid vh-100 w-100 d-flex flex-column justify-content-center align-items-center bg-white">
      <div className="text-center mb-4">
        <img
          src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png"
          alt="Logo Unicah"
          className="img-fluid"
          width="150"
        />
        <h3 className="text-primary mt-2">UNIVERSIDAD CATÓLICA DE HONDURAS</h3>
        <p className="text-secondary">NUESTRA SEÑORA REINA DE LA PAZ</p>
      </div>

      <div className="card shadow-lg p-4" style={{ width: '350px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label fw-bold">Usuario:</label>
            <input
              type="text"
              id="usuario"
              className="form-control"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label fw-bold">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Ingresar</button>
          {errorMensaje && <div className="text-danger text-center mt-2">{errorMensaje}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
