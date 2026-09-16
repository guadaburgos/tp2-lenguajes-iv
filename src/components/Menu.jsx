import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <header className="encabezado">
      <p className="nombre-sitio">Mi sitio React</p>

      <nav aria-label="Menú principal">
        <NavLink to="/" end>
          Inicio
        </NavLink>

        <NavLink to="/servicios">
          Servicios
        </NavLink>

        <NavLink to="/contacto">
          Contacto
        </NavLink>
      </nav>
    </header>
  );
}

export default Menu;