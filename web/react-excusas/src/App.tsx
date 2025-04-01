import './App.css'; // Importa el archivo de estilos

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container shadow p-4 bg-white rounded text-center">
        <h2 className="text-primary">SISTEMA DE EXCUSAS UNICAH</h2>
        <img src="https://i.postimg.cc/NfcLn1tB/image-removebg-preview-65.png" alt="Escudo UNICAH" className="img-fluid mb-3" width="120" />
        <h3>BIENVENIDO</h3>

        <div className="alert alert-primary mt-3">SELECCIONA UNA RAZÓN</div>
        <div className="d-flex flex-wrap justify-content-around">
          {/* Aquí irán los radios de las razones */}
        </div>

        <div className="mt-3 text-start">
          <label htmlFor="description" className="form-label">Describe la inasistencia:</label>
          <textarea id="description" className="form-control" rows={3} required></textarea>
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

export default App;