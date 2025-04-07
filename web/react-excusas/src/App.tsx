import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ExcusaAlumnoScreen from './components/ExcusaAlumnoScreen';
import DocenteScreen from './components/DocentesScreen'; // Asegúrate que este componente exista

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/excusa-alumno" element={<ExcusaAlumnoScreen />} />
        <Route path="/docente" element={<DocenteScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
