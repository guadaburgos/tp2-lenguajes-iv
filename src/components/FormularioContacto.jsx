import { useState } from "react";

function FormularioContacto() {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setDatos({
      ...datos,
      [name]: value,
    });

    
    setErrores((anteriores) => ({
      ...anteriores,
      [name]: "",
    }));

    setAviso("");
  }

  function validar() {
    const nuevosErrores = {};
    const nombre = datos.nombre.trim();
    const correo = datos.correo.trim();

    if (!nombre) {
      nuevosErrores.nombre = "Ingresá tu nombre y apellido.";
    } else if (!/^[\p{L}\p{M}\s'’-]+$/u.test(nombre)) {
      nuevosErrores.nombre =
        "El nombre y apellido no deben contener números ni símbolos como @.";
    } else if (nombre.split(/\s+/).length < 2) {
      nuevosErrores.nombre = "Ingresá al menos un nombre y un apellido.";
    }

    if (!correo) {
      nuevosErrores.correo = "Ingresá tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      nuevosErrores.correo =
        "Ingresá un correo válido, por ejemplo: nombre@gmail.com.";
    }

    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = "Escribí un mensaje.";
    } else if (datos.mensaje.length > 300) {
      nuevosErrores.mensaje = "El mensaje no puede superar los 300 caracteres.";
    }

    return nuevosErrores;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    setAviso("");

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    
    setAviso(
      "Los datos son válidos. El envío al correo todavía no está configurado."
    );
  }

  return (
    <form className="formulario-contacto" onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label htmlFor="nombre">Nombre y apellido</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder="Ejemplo: Guadalupe Burgos"
          value={datos.nombre}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? "error-nombre" : undefined}
        />

        {errores.nombre && (
          <p id="error-nombre" className="error" role="alert">
            {errores.nombre}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          autoComplete="email"
          placeholder="Ejemplo: nombre@gmail.com"
          value={datos.correo}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errores.correo)}
          aria-describedby={errores.correo ? "error-correo" : undefined}
        />

        {errores.correo && (
          <p id="error-correo" className="error" role="alert">
            {errores.correo}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          placeholder="Escribí tu consulta..."
          value={datos.mensaje}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errores.mensaje)}
          aria-describedby={
            errores.mensaje
              ? "contador-mensaje error-mensaje"
              : "contador-mensaje"
          }
        />

        <p id="contador-mensaje" className="contador">
          {datos.mensaje.length} / 300 caracteres
        </p>

        {errores.mensaje && (
          <p id="error-mensaje" className="error" role="alert">
            {errores.mensaje}
          </p>
        )}
      </div>

      <button type="submit" className="boton-enviar">
        Enviar mensaje
      </button>

      {aviso && (
        <p className="aviso-formulario" role="status">
          {aviso}
        </p>
      )}
    </form>
  );
}

export default FormularioContacto;