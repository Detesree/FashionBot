
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Chatbot from "./components/Chatbot";
import Admin from "./pages/Admin";

const products = [
  {
    name: "Camisas ejecutivas",
    category: "Línea formal",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700",
    description: "Diseños elegantes para el entorno empresarial.",
  },
  {
    name: "Prendas casuales",
    category: "Línea casual",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
    description: "Comodidad y estilo para todos los días.",
  },
  {
    name: "Colección de moda",
    category: "Diseños exclusivos",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700",
    description: "Prendas confeccionadas con atención al detalle.",
  },
];

const services = [
  {
    icon: "bi-chat-dots",
    title: "Consultas",
    description:
      "Recibimos y clasificamos tus preguntas y solicitudes.",
    action: "Consultar",
    message: "Hola, quiero realizar una consulta.",
  },
  {
    icon: "bi-bag-check",
    title: "Pedidos",
    description:
      "Gestiona tus pedidos de prendas de manera sencilla.",
    action: "Realizar pedido",
    message: "Quiero realizar un pedido.",
  },
  {
    icon: "bi-calendar-check",
    title: "Citas",
    description:
      "Programa una cita para recibir atención personalizada.",
    action: "Agendar cita",
    message: "Quiero agendar una cita.",
  },
  {
    icon: "bi-headset",
    title: "Asesoría",
    description:
      "Recibe orientación sobre nuestros productos y servicios.",
    action: "Solicitar asesoría",
    message: "Hola, necesito asesoría.",
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (sectionId) => {
    setMenuOpen(false);

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="fashion-page">
      {/* NAVEGACIÓN */}
      <nav className="navbar navbar-expand-lg fashion-navbar sticky-top">
        <div className="container">
          <a
            className="navbar-brand fashion-logo"
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              goToSection("inicio");
            }}
          >
            <i className="bi bi-scissors"></i>
            Fashion<span>Bot</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir o cerrar menú"
            aria-expanded={menuOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""
              }`}
          >
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {[
                ["Inicio", "inicio"],
                ["Nosotros", "nosotros"],
                ["Catálogo", "catalogo"],
                ["Servicios", "servicios"],
                ["Contacto", "contacto"],
              ].map(([label, id]) => (
                <li className="nav-item" key={id}>
                  <a
                    className="nav-link"
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}

              <li className="nav-item ms-lg-3">
                <a
                  href="#servicios"
                  className="btn btn-fashion"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection("servicios");
                  }}
                >
                  Atención al cliente
                  <i className="bi bi-arrow-right ms-2"></i>
                </a>
              </li>

              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link
                  to="/admin"
                  className="btn btn-outline-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-person-gear me-2"></i>
                  Administrador
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* INICIO */}
      <header className="hero-section" id="inicio">
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-label">
              EMPRESA DE CONFECCIONES
            </span>

            <h1>
              Confeccionamos calidad,
              <span> vestimos tus ideas.</span>
            </h1>

            <p>
              Descubre nuestra colección de prendas y recibe
              atención personalizada. En FashionBot estamos
              preparados para ayudarte.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-fashion btn-lg"
                onClick={() => goToSection("catalogo")}
              >
                Explorar catálogo
                <i className="bi bi-arrow-right ms-2"></i>
              </button>

              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => goToSection("servicios")}
              >
                Conocer servicios
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* NOSOTROS */}
      <section
        className="about-section section-padding"
        id="nosotros"
      >
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                className="about-image"
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900"
                alt="Colección de moda y confecciones"
                loading="lazy"
              />
            </div>

            <div className="col-lg-6">
              <span className="section-label">
                CONÓCENOS
              </span>

              <h2 className="section-title">
                Calidad y compromiso en cada confección.
              </h2>

              <p className="section-description">
                FashionBot es una empresa de confecciones
                dedicada a ofrecer prendas de vestir que
                combinan diseño, calidad y comodidad.
              </p>

              <p className="section-description">
                Nuestro asistente virtual facilita la atención
                de nuestros clientes, la recepción de consultas,
                la gestión de pedidos y el agendamiento de citas.
              </p>

              <button
                className="btn btn-fashion"
                onClick={() => goToSection("servicios")}
              >
                Conoce nuestros servicios
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section
        className="catalog-section section-padding"
        id="catalogo"
      >
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-label">
              NUESTRAS PRENDAS
            </span>

            <h2 className="section-title">
              Descubre nuestro catálogo
            </h2>

            <p className="section-description">
              Conoce algunas de nuestras líneas de confección.
            </p>
          </div>

          <div className="row g-4 mt-3">
            {products.map((product) => (
              <div
                className="col-md-6 col-lg-4"
                key={product.name}
              >
                <article className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>
                    <p>{product.description}</p>

                    <button
                      className="btn btn-fashion"
                      onClick={() => goToSection("servicios")}
                    >
                      Solicitar información
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section
        className="services-section section-padding"
        id="servicios"
      >
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-label">
              ATENCIÓN PERSONALIZADA
            </span>

            <h2 className="section-title">
              ¿Cómo podemos ayudarte?
            </h2>

            <p className="section-description">
              Selecciona el servicio que necesitas y utiliza
              nuestro asistente virtual.
            </p>
          </div>

          <div className="row g-4 mt-3">
            {services.map((service) => (
              <div
                className="col-md-6 col-lg-3"
                key={service.title}
              >
                <div className="service-card h-100">
                  <i
                    className={`bi ${service.icon} service-icon`}
                  ></i>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <button
                    className="btn btn-outline-primary mt-auto"
                    onClick={() =>
                      goToSection("contacto")
                    }
                    title={service.message}
                  >
                    {service.action}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVITACIÓN AL CHATBOT */}
      <section className="assistant-section">
        <div className="container text-center">
          <i className="bi bi-robot assistant-icon"></i>

          <h2>¿Necesitas ayuda?</h2>

          <p>
            Nuestro asistente virtual está preparado para
            atender tus solicitudes, registrar pedidos y
            ayudarte a programar citas.
          </p>

          <p className="assistant-coming">
            <i className="bi bi-chat-dots me-2"></i>
            Haz clic en el botón flotante de chat para comenzar.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        className="contact-section section-padding"
        id="contacto"
      >
        <div className="container text-center">
          <span className="section-label">
            ESTAMOS PARA AYUDARTE
          </span>

          <h2 className="section-title">
            Hablemos de tu próximo proyecto.
          </h2>

          <p className="section-description">
            ¿Tienes dudas sobre nuestras prendas, necesitas
            realizar un pedido o deseas programar una cita?
            FashionBot te ayuda.
          </p>

          <button
            className="btn btn-fashion btn-lg"
            onClick={() => goToSection("servicios")}
          >
            Ver opciones de atención
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="fashion-footer">
        <div className="container text-center">
          <h4>
            <i className="bi bi-scissors"></i> FashionBot
          </h4>

          <p>
            Calidad, diseño y atención a nuestros clientes.
          </p>

          <div className="footer-links mb-3">
            <button onClick={() => goToSection("inicio")}>
              Inicio
            </button>

            <button onClick={() => goToSection("nosotros")}>
              Nosotros
            </button>

            <button onClick={() => goToSection("catalogo")}>
              Catálogo
            </button>

            <button onClick={() => goToSection("contacto")}>
              Contacto
            </button>
          </div>

          <Link to="/admin" className="footer-admin-link">
            Acceso administrativo
          </Link>

          <hr />

          <small>
            © 2026 FashionBot. Todos los derechos reservados.
          </small>
        </div>
      </footer>

      {/* CHATBOT */}
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
