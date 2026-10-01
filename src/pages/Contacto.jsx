import FormularioContacto from "../components/FormularioContacto";

function Contacto() {
  return (
    <section className="pagina-contacto">
      <h1>Contacto</h1>

      <p className="introduccion-contacto">
        Completá el formulario para enviarnos tu consulta.
        Todos los campos son obligatorios.
      </p>

      <FormularioContacto />
    </section>
  );
}

export default Contacto;