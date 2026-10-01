import { useState } from "react";

function FormularioContacto() {
  
  const correoDestino = "guadaburgos0205@gmail.com"

  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value,
    }));

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: "",
    }));
  }

  function validar() {
    const nuevosErrores = {};
    const nombre = datos.nombre.trim();
    const correo = datos.correo.trim();

    // Validación del nombre y apellido.
    if (!nombre) {
      nuevosErrores.nombre = "Ingresá tu nombre y apellido.";
    } else if (!/^[\p{L}\p{M}\s'’-]+$/u.test(nombre)) {
      nuevosErrores.nombre =
        "El nombre y apellido no deben contener números ni símbolos como @.";
    } else if (nombre.split(/\s+/).length < 2) {
      nuevosErrores.nombre =
        "Ingresá al menos un nombre y un apellido.";
    }

    // Validación del correo electrónico.
    if (!correo) {
      nuevosErrores.correo = "Ingresá tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      nuevosErrores.correo =
        "Ingresá un correo válido, por ejemplo: nombre@gmail.com.";
    }

    // Validación del mensaje.
    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = "Escribí un mensaje.";
    } else if (datos.mensaje.length > 300) {
      nuevosErrores.mensaje =
        "El mensaje no puede superar los 300 caracteres.";
    }

    return nuevosErrores;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    // Si hay errores, detenemos el envío.
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // Si los datos son válidos, enviamos el formulario a FormSubmit.
    event.currentTarget.submit();
  }

  return (
    <form
      className="formulario-contacto"
      action={`https://formsubmit.co/${correoDestino}`}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Configuración del correo que vamos a recibir. */}
      <input
        type="hidden"
        name="_subject"
        value="Nueva consulta desde mi sitio React"
      />

      <input
        type="hidden"
        name="_replyto"
        value={datos.correo.trim()}
      />

      <input
        type="hidden"
        name="_template"
        value="table"
      />

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
          aria-describedby={
            errores.nombre ? "error-nombre" : undefined
          }
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
          aria-describedby={
            errores.correo ? "error-correo" : undefined
          }
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
    </form>
  );
}

export default FormularioContacto;