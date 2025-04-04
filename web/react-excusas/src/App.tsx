import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ExcusaAlumnoScreen from './components/ExcusaAlumnoScreen'; // Nombre correcto del componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/excusa-alumno" element={<ExcusaAlumnoScreen />} /> {/* Ruta corregida */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;