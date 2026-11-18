const CONSULTATIONS_KEY = "fashionbot_consultations";
const ORDERS_KEY = "fashionbot_orders";
const APPOINTMENTS_KEY = "fashionbot_appointments";

// ⚠️ NUEVA FUNCIÓN: Avisa a React que los datos cambiaron
function notifyChange() {
    window.dispatchEvent(new Event("fashionbot_data_updated"));
}

// ================================
// CONSULTAS
// ================================

export function getConsultations() {
    try {
        return JSON.parse(localStorage.getItem(CONSULTATIONS_KEY)) || [];
    } catch (error) {
        console.error("Error al obtener consultas:", error);
        return [];
    }
}

export function saveConsultation(consultation) {
    try {
        const consultations = getConsultations();

        const newConsultation = {
            id: Date.now(),
            message: consultation.message,
            category: consultation.category,
            answer: consultation.answer,
            date: new Date().toISOString(),
            status: "Pendiente",
        };

        consultations.push(newConsultation);

        localStorage.setItem(
            CONSULTATIONS_KEY,
            JSON.stringify(consultations)
        );

        notifyChange(); // <--- AVISA AQUÍ
        return newConsultation;
    } catch (error) {
        console.error("Error al guardar consulta:", error);
        return null;
    }
}

// ================================
// PEDIDOS
// ================================

export function getOrders() {
    try {
        return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        return [];
    }
}

export function saveOrder(order) {
    try {
        const orders = getOrders();

        const newOrder = {
            ...order,
            id: Date.now(),
            reference: `FB-${Date.now().toString().slice(-8)}`,
            date: new Date().toISOString(),
            status: "Recibido",
        };

        orders.push(newOrder);

        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

        notifyChange(); // <--- AVISA AQUÍ
        return newOrder;
    } catch (error) {
        console.error("Error al guardar pedido:", error);
        return null;
    }
}

export function updateOrderStatus(reference, newStatus) {
    try {
        const orders = getOrders();
        const updatedOrders = orders.map((order) => {
            if (order.reference === reference) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

        notifyChange(); // <--- AVISA AQUÍ
        return true;
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        return false;
    }
}

// ================================
// CITAS
// ================================

export function getAppointments() {
    try {
        return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
    } catch (error) {
        console.error("Error al obtener citas:", error);
        return [];
    }
}

export function saveAppointment(appointment) {
    try {
        const appointments = getAppointments();

        const newAppointment = {
            ...appointment,
            id: Date.now(),
            reference: `CITA-${Date.now().toString().slice(-8)}`,
            dateCreated: new Date().toISOString(),
            status: "Programada",
        };

        appointments.push(newAppointment);

        localStorage.setItem(
            APPOINTMENTS_KEY,
            JSON.stringify(appointments)
        );

        notifyChange(); // <--- AVISA AQUÍ
        return newAppointment;
    } catch (error) {
        console.error("Error al guardar cita:", error);
        return null;
    }
}


// ================================
// LIMPIAR TODOS LOS DATOS (Para pruebas)
// ================================
export function clearAllData() {
    try {
        localStorage.removeItem(CONSULTATIONS_KEY);
        localStorage.removeItem(ORDERS_KEY);
        localStorage.removeItem(APPOINTMENTS_KEY);

        notifyChange(); // Avisa a React que los datos se vaciaron
        return true;
    } catch (error) {
        console.error("Error al limpiar los datos:", error);
        return false;
    }
}