import { useEffect, useState } from "react";
import {
    getConsultations,
    getOrders,
    getAppointments,
    updateOrderStatus,
    clearAllData
} from "../utils/storage";

function Admin() {
    const [consultations, setConsultations] = useState([]);
    const [orders, setOrders] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("consultas");

    const loadData = () => {
        // Aseguramos que si hay un error, siempre sea un array vacío y no rompa los contadores
        setConsultations(getConsultations() || []);
        setOrders(getOrders() || []);
        setAppointments(getAppointments() || []);
    };

    useEffect(() => {
        loadData();

        // 🚨 NUEVO: Escucha si los datos cambian en otra pestaña del mismo navegador
        const handleStorageChange = (e) => {
            if (e.key && (
                e.key.includes('consultation') ||
                e.key.includes('order') ||
                e.key.includes('appointment')
            )) {
                loadData();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleString("es-CO");
    };

    const formatPrice = (price) => {
        if (!price) return "Pendiente";
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleConfirmOrder = (reference) => {
        if (window.confirm(`¿Estás seguro de confirmar el pedido ${reference}?`)) {
            updateOrderStatus(reference, "Confirmado");
            loadData();
        }
    };

    const handleClearData = () => {
        if (window.confirm("⚠️ ¿Estás seguro de que deseas borrar TODAS las consultas, pedidos y citas? Esta acción no se puede deshacer.")) {
            clearAllData();
            // loadData() se llama automáticamente si tienes notifyChange en tu storage.js
            loadData();
        }
    };

    return (
        <div className="container py-5">
            {/* ENCABEZADO CON LOS DOS BOTONES */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Panel administrativo</h2>
                    <p className="text-muted">Gestión de FashionBot</p>
                </div>

                <div className="d-flex gap-2">
                    <button className="btn btn-outline-danger" onClick={handleClearData}>
                        <i className="bi bi-trash me-2"></i> Borrar Todo
                    </button>
                    <button className="btn btn-primary" onClick={loadData}>
                        <i className="bi bi-arrow-clockwise me-2"></i> Actualizar Datos
                    </button>
                </div>
            </div>

            {/* TARJETAS DE ESTADÍSTICAS */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3 bg-light">
                        <h6 className="text-muted">Consultas totales</h6>
                        <h2 className="fw-bold text-primary">{consultations.length}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3 bg-light">
                        <h6 className="text-muted">Pedidos recibidos</h6>
                        <h2 className="fw-bold text-success">{orders.length}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3 bg-light">
                        <h6 className="text-muted">Citas agendadas</h6>
                        <h2 className="fw-bold text-warning">{appointments.length}</h2>
                    </div>
                </div>
            </div>

            {/* PESTAÑAS (TABS) */}
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${activeTab === "consultas" ? "active" : "text-dark"}`}
                        onClick={() => setActiveTab("consultas")}
                    >
                        <i className="bi bi-chat-dots me-2"></i>Consultas
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${activeTab === "pedidos" ? "active" : "text-dark"}`}
                        onClick={() => setActiveTab("pedidos")}
                    >
                        <i className="bi bi-bag me-2"></i>Pedidos
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${activeTab === "citas" ? "active" : "text-dark"}`}
                        onClick={() => setActiveTab("citas")}
                    >
                        <i className="bi bi-calendar-event me-2"></i>Citas
                    </button>
                </li>
            </ul>

            {/* CONTENIDO DE LA PESTAÑA SELECCIONADA */}
            <div className="card shadow-sm border-0">
                <div className="card-body">

                    {/* TAB: CONSULTAS */}
                    {activeTab === "consultas" && (
                        consultations.length === 0 ? (
                            <p className="text-muted text-center py-4">No hay consultas registradas.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Mensaje</th>
                                            <th>Categoría</th>
                                            <th>Respuesta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consultations.map((c) => (
                                            <tr key={c.id}>
                                                <td className="text-nowrap">{formatDate(c.date)}</td>
                                                <td>{c.message}</td>
                                                <td><span className="badge bg-primary">{c.category}</span></td>
                                                <td className="text-muted small" style={{ whiteSpace: "pre-wrap" }}>{c.answer}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}

                    {/* TAB: PEDIDOS */}
                    {activeTab === "pedidos" && (
                        orders.length === 0 ? (
                            <p className="text-muted text-center py-4">No hay pedidos registrados.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Ref.</th>
                                            <th>Cliente</th>
                                            <th>Contacto</th>
                                            <th>Prenda</th>
                                            <th>Cant.</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((o) => (
                                            <tr key={o.id}>
                                                <td className="fw-bold">{o.reference}</td>
                                                <td>{o.customer}</td>
                                                <td>{o.phone}</td>
                                                <td>
                                                    {o.garment} <br />
                                                    <small className="text-muted">Talla: {o.size} | Color: {o.color}</small>
                                                </td>
                                                <td>{o.quantity}</td>
                                                <td>{formatPrice(o.totalPrice)}</td>
                                                <td>
                                                    <span className={`badge ${o.status === "Confirmado" ? "bg-success" : "bg-warning text-dark"}`}>
                                                        {o.status || "Pendiente"}
                                                    </span>
                                                </td>
                                                <td>
                                                    {o.status !== "Confirmado" && (
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => handleConfirmOrder(o.reference)}
                                                        >
                                                            <i className="bi bi-check2-circle"></i> Confirmar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}

                    {/* TAB: CITAS */}
                    {activeTab === "citas" && (
                        appointments.length === 0 ? (
                            <p className="text-muted text-center py-4">No hay citas agendadas.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Ref.</th>
                                            <th>Cliente</th>
                                            <th>Contacto</th>
                                            <th>Fecha Cita</th>
                                            <th>Hora</th>
                                            <th>Motivo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((a) => (
                                            <tr key={a.id}>
                                                <td className="fw-bold">{a.reference}</td>
                                                <td>{a.customer}</td>
                                                <td>{a.phone}</td>
                                                <td>{a.date}</td>
                                                <td>{a.time}</td>
                                                <td>{a.reason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}

                </div>
            </div>
        </div>
    );
}

export default Admin;