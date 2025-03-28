import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3008/api/unicah/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: usuario, pass: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        window.location.href = 'menu.html'; // Redirige a la pantalla de excusa
      } else {
        setErrorMensaje(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setErrorMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white text-center fw-bold">
                EXCUSA
              </div>
              <div className="card-body text-center">
                <img
                  src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png"
                  alt="Logo Unicah"
                  className="img-fluid mb-3"
                  width="100"
                />

                <form id="loginForm" onSubmit={handleSubmit}>
                  <div className="mb-3 text-start">
                    <label htmlFor="usuario" className="form-label">
                      Usuario:
                    </label>
                    <input
                      type="text"
                      id="usuario"
                      className="form-control"
                      placeholder="Ingrese su usuario"
                      required
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="contrasena" className="form-label">
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      id="contrasena"
                      className="form-control"
                      placeholder="Ingrese su contraseña"
                      required
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Ingresar
                  </button>
                  {errorMensaje && (
                    <div className="text-danger mt-2">{errorMensaje}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;