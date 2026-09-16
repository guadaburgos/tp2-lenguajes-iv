import { HashRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <HashRouter>
      <Menu />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;