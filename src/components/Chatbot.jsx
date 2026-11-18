import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

import {
    saveConsultation,
    saveOrder,
    getOrders,
    saveAppointment,
} from "../utils/storage";

// CATEGORÍAS DEL CATÁLOGO
const catalogCategories = [
    { id: "hombre", name: "Ropa para hombre", icon: "bi-person" },
    { id: "mujer", name: "Ropa para mujer", icon: "bi-person-dress" },
    { id: "ninos", name: "Ropa para niños", icon: "bi-people" },
    { id: "empresarial", name: "Uniformes empresariales", icon: "bi-briefcase" },
];

// CATÁLOGO DE PRODUCTOS DE DEMOSTRACIÓN
const products = [
    { reference: "HOM-001", name: "Camisa clásica", category: "hombre", price: 65000, sizes: "S, M, L, XL", colors: "Blanco, azul, negro" },
    { reference: "HOM-002", name: "Camisa manga larga", category: "hombre", price: 75000, sizes: "S, M, L, XL", colors: "Blanco, azul, gris" },
    { reference: "HOM-003", name: "Camiseta básica", category: "hombre", price: 35000, sizes: "S, M, L, XL, XXL", colors: "Blanco, negro, gris" },
    { reference: "HOM-004", name: "Pantalón formal", category: "hombre", price: 95000, sizes: "28 a 38", colors: "Negro, azul, gris" },
    { reference: "HOM-005", name: "Jean clásico", category: "hombre", price: 105000, sizes: "28 a 38", colors: "Azul, negro" },
    { reference: "HOM-006", name: "Chaqueta casual", category: "hombre", price: 145000, sizes: "S, M, L, XL", colors: "Negro, azul" },
    { reference: "HOM-007", name: "Sudadera deportiva", category: "hombre", price: 85000, sizes: "S, M, L, XL", colors: "Negro, gris, azul" },
    { reference: "HOM-008", name: "Polo clásico", category: "hombre", price: 55000, sizes: "S, M, L, XL", colors: "Blanco, negro, azul, rojo" },
    { reference: "MUJ-001", name: "Blusa elegante", category: "mujer", price: 58000, sizes: "XS, S, M, L, XL", colors: "Blanco, negro, beige" },
    { reference: "MUJ-002", name: "Blusa casual", category: "mujer", price: 45000, sizes: "XS, S, M, L, XL", colors: "Blanco, rosado, azul" },
    { reference: "MUJ-003", name: "Vestido casual", category: "mujer", price: 95000, sizes: "S, M, L, XL", colors: "Negro, azul, rojo" },
    { reference: "MUJ-004", name: "Vestido elegante", category: "mujer", price: 145000, sizes: "S, M, L, XL", colors: "Negro, vino tinto" },
    { reference: "MUJ-005", name: "Pantalón de dama", category: "mujer", price: 85000, sizes: "6, 8, 10, 12, 14", colors: "Negro, beige, azul" },
    { reference: "MUJ-006", name: "Jean para mujer", category: "mujer", price: 95000, sizes: "6, 8, 10, 12, 14", colors: "Azul, negro" },
    { reference: "MUJ-007", name: "Falda clásica", category: "mujer", price: 65000, sizes: "S, M, L, XL", colors: "Negro, beige, azul" },
    { reference: "MUJ-008", name: "Conjunto femenino", category: "mujer", price: 125000, sizes: "S, M, L, XL", colors: "Negro, beige, rosado" },
    { reference: "NIN-001", name: "Camiseta infantil", category: "ninos", price: 30000, sizes: "2, 4, 6, 8, 10, 12", colors: "Azul, rojo, blanco" },
    { reference: "NIN-002", name: "Pantalón infantil", category: "ninos", price: 45000, sizes: "2, 4, 6, 8, 10, 12", colors: "Azul, negro, gris" },
    { reference: "NIN-003", name: "Vestido infantil", category: "ninos", price: 55000, sizes: "2, 4, 6, 8, 10, 12", colors: "Rosado, blanco, azul" },
    { reference: "NIN-004", name: "Conjunto infantil", category: "ninos", price: 75000, sizes: "2, 4, 6, 8, 10, 12", colors: "Varios colores" },
    { reference: "NIN-005", name: "Sudadera infantil", category: "ninos", price: 65000, sizes: "2, 4, 6, 8, 10, 12", colors: "Gris, azul, negro" },
    { reference: "NIN-006", name: "Jean infantil", category: "ninos", price: 55000, sizes: "2, 4, 6, 8, 10, 12", colors: "Azul, negro" },
    { reference: "NIN-007", name: "Chaqueta infantil", category: "ninos", price: 85000, sizes: "2, 4, 6, 8, 10, 12", colors: "Azul, rojo, negro" },
    { reference: "NIN-008", name: "Pijama infantil", category: "ninos", price: 50000, sizes: "2, 4, 6, 8, 10, 12", colors: "Varios colores" },
    { reference: "EMP-001", name: "Polo empresarial", category: "empresarial", price: 55000, sizes: "S, M, L, XL, XXL", colors: "Blanco, azul, negro" },
    { reference: "EMP-002", name: "Camisa corporativa", category: "empresarial", price: 75000, sizes: "S, M, L, XL, XXL", colors: "Blanco, azul, gris" },
    { reference: "EMP-003", name: "Pantalón empresarial", category: "empresarial", price: 95000, sizes: "28 a 40", colors: "Negro, azul, gris" },
    { reference: "EMP-004", name: "Overol de trabajo", category: "empresarial", price: 145000, sizes: "S, M, L, XL, XXL", colors: "Azul, gris, negro" },
    { reference: "EMP-005", name: "Chaqueta corporativa", category: "empresarial", price: 135000, sizes: "S, M, L, XL, XXL", colors: "Azul, negro, gris" },
    { reference: "EMP-006", name: "Delantal de trabajo", category: "empresarial", price: 45000, sizes: "Unitalla", colors: "Negro, blanco, azul" },
    { reference: "EMP-007", name: "Conjunto antifluido", category: "empresarial", price: 125000, sizes: "S, M, L, XL, XXL", colors: "Azul, blanco, verde" },
    { reference: "EMP-008", name: "Chaleco empresarial", category: "empresarial", price: 85000, sizes: "S, M, L, XL, XXL", colors: "Negro, azul, gris" },
];

// FORMATEAR PRECIOS
function formatPrice(price) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(price);
}

function getProductImage(product) {
    const folders = {
        hombre: "hombre",
        mujer: "mujeres",
        ninos: "niños",
        empresarial: "empresarial",
    };
    const folder = folders[product.category];
    if (!folder) return null;
    return `/images/${folder}/${product.reference}.jpg`;
}

// OPCIONES PRINCIPALES
const options = [
    "Ver catálogo",
    "Consultar información",
    "Realizar un pedido",
    "Agendar una cita",
    "Presentar una queja o reclamo",
    "Consultar un pedido",
    "Solicitar asesoría",
];

// PASOS PARA REALIZAR UN PEDIDO
const orderSteps = [
    { key: "customer", question: "¿Cuál es tu nombre completo?", type: "text" },
    { key: "phone", question: "¿Cuál es tu número de teléfono?", type: "tel" },
    { key: "garment", question: "¿Qué tipo de prenda deseas?", choices: ["Camisa", "Pantalón", "Vestido", "Chaqueta", "Uniforme", "Otra prenda"] },
    { key: "size", question: "Selecciona la talla:", choices: ["XS", "S", "M", "L", "XL", "XXL"] },
    { key: "color", question: "¿Qué color deseas?", choices: ["Negro", "Blanco", "Azul", "Gris", "Rojo", "Otro"] },
    { key: "quantity", question: "¿Qué cantidad de prendas necesitas?", type: "number" },
];

// PASOS PARA AGENDAR UNA CITA
const appointmentSteps = [
    { key: "customer", question: "¿Cuál es tu nombre completo?", type: "text" },
    { key: "phone", question: "¿Cuál es tu número de teléfono?", type: "tel" },
    { key: "date", question: "¿Qué día deseas agendar tu cita?", type: "date" },
    { key: "time", question: "¿A qué hora deseas tu cita?", type: "time" },
    { key: "reason", question: "¿Cuál es el motivo de tu cita?", choices: ["Asesoría de diseño", "Toma de medidas", "Consulta sobre prendas", "Seguimiento de pedido", "Otro motivo"] },
];

// PASOS PARA LA ASESORÍA PERSONALIZADA
const adviceSteps = [
    { key: "adviceTarget", question: "¡Comencemos! 😊 ¿Para quién estás buscando una prenda?", choices: ["Hombre", "Mujer", "Niño o niña", "Uniformes empresariales"] },
    { key: "occasion", question: "¿Para qué ocasión necesitas la prenda?", choices: ["Uso diario", "Trabajo", "Evento especial", "Deporte", "Colegio", "Otra ocasión"] },
    { key: "garment", question: "¿Qué tipo de prenda te interesa?", choices: ["Camisa o camiseta", "Pantalón o jean", "Vestido o falda", "Chaqueta", "Uniforme", "No estoy seguro, quiero recomendaciones"] },
    { key: "budget", question: "¿Cuál es tu presupuesto aproximado por prenda?", choices: ["Menos de $50.000", "Entre $50.000 y $80.000", "Entre $80.001 y $120.000", "Más de $120.000", "No tengo un presupuesto definido"] },
];

// PASOS PARA PRESENTAR UNA QUEJA O RECLAMO
const complaintSteps = [
    { key: "customer", question: "¿Cuál es tu nombre completo?", type: "text" },
    { key: "phone", question: "¿Cuál es tu número de teléfono?", type: "tel" },
    { key: "orderReference", question: "¿Tienes el número de referencia del pedido? Si no, escribe 'No'.", type: "text" },
    { key: "complaintType", question: "¿Qué tipo de inconveniente presentas?", choices: ["Producto defectuoso", "Producto diferente al solicitado", "Retraso en la entrega", "Problema con el pago", "Atención al cliente", "Otro"] },
    { key: "description", question: "Describe brevemente lo sucedido:", type: "text" },
];

// NORMALIZAR TEXTO
function normalizeText(message) {
    return message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// BUSCAR CATEGORÍA SEGÚN EL MENSAJE
function detectCategory(message) {
    const text = normalizeText(message);
    if (/hombre|masculino|caballero/.test(text)) return "hombre";
    if (/mujer|femenino|dama/.test(text)) return "mujer";
    if (/nino|nina|infantil|bebe/.test(text)) return "ninos";
    if (/empresarial|empresa|trabajo|corporativo/.test(text)) return "empresarial";
    return "";
}

// GENERAR RECOMENDACIONES SEGÚN LAS RESPUESTAS
function getAdviceRecommendations(answers) {
    const categoryMap = { "Hombre": "hombre", "Mujer": "mujer", "Niño o niña": "ninos", "Uniformes empresariales": "empresarial" };
    const category = categoryMap[answers.adviceTarget];
    let recommendations = products.filter((product) => product.category === category);

    const garment = normalizeText(answers.adviceGarment);
    if (!garment.includes("no estoy seguro")) {
        if (garment.includes("camisa") || garment.includes("camiseta")) recommendations = recommendations.filter((p) => /camisa|camiseta|polo/.test(normalizeText(p.name)));
        else if (garment.includes("pantalon")) recommendations = recommendations.filter((p) => /pantalon|jean|pantaloneta/.test(normalizeText(p.name)));
        else if (garment.includes("vestido")) recommendations = recommendations.filter((p) => /vestido|falda/.test(normalizeText(p.name)));
        else if (garment.includes("chaqueta")) recommendations = recommendations.filter((p) => /chaqueta/.test(normalizeText(p.name)));
        else if (garment.includes("uniforme")) recommendations = recommendations.filter((p) => /uniforme|overol|conjunto|polo|camisa/.test(normalizeText(p.name)));
    }

    const budget = answers.adviceBudget;
    if (budget === "Menos de $50.000") recommendations = recommendations.filter((p) => p.price < 50000);
    else if (budget === "Entre $50.000 y $80.000") recommendations = recommendations.filter((p) => p.price >= 50000 && p.price <= 80000);
    else if (budget === "Entre $80.001 y $120.000") recommendations = recommendations.filter((p) => p.price > 80000 && p.price <= 120000);
    else if (budget === "Más de $120.000") recommendations = recommendations.filter((p) => p.price > 120000);

    return recommendations;
}

// CLASIFICACIÓN AUTOMÁTICA DE CONSULTAS
function classifyMessage(message) {
    const text = normalizeText(message);
    if (/gracias|muchas gracias|te agradezco/.test(text)) return { category: "Atención general", answer: "¡De nada! 😊 Estoy aquí para lo que necesites. ¿Hay algo más en lo que pueda ayudarte?" };
    if (/queja|reclamo|problema|inconformidad/.test(text)) return { category: "Quejas y reclamos", answer: "Lamentamos cualquier inconveniente. En FashionBot queremos ayudarte. Cuéntanos qué sucedió y registraremos tu solicitud para su revisión." };
    if (/asesor|asesoria|asesorar|orientacion|recomendacion|recomendar|aconsejar|necesito ayuda|quiero ayuda|ayuda para elegir/.test(text)) return { category: "Asesoría personalizada", answer: "¡Claro que sí! 😊 En FashionBot estamos para asesorarte.\n\nPuedo ayudarte con diseños, tallas, colores, materiales y tipos de confección.\n\nTambién puedo mostrarte nuestro catálogo para que elijas una prenda por su fotografía, referencia y precio.\n\nEscribe 'ver catálogo' para comenzar. ¿Qué tipo de ropa estás buscando?" };
    if (/precio|costo|valor|cuesta|cotizacion|cotizar/.test(text)) return { category: "Información comercial", answer: "¡Claro! Tenemos un catálogo de demostración con precios provisionales. Escribe 'ver catálogo' o indícame qué tipo de prenda buscas para mostrarte las opciones y sus precios." };
    if (/talla|color|tela|material|prenda|camisa|pantalon|vestido|chaqueta|uniforme|confeccion|diseno/.test(text)) return { category: "Información de productos", answer: "¡Con gusto te ayudamos! 👗 Puedo mostrarte prendas con fotografías, referencias, tallas, colores y precios provisionales. Escribe 'ver catálogo' para explorar los productos." };
    if (/hola|buenos|buenas|saludos|que tal/.test(text)) return { category: "Atención general", answer: "¡Hola! 👋 Qué gusto saludarte. Soy FashionBot y estoy aquí para ayudarte.\n\nPuedes ver nuestro catálogo, consultar precios, recibir recomendaciones, realizar pedidos o agendar citas." };
    return { category: "Consulta general", answer: "Gracias por comunicarte con FashionBot. 😊\n\n¿En qué más puedo ayudarte?" };
}

// FECHA LOCAL PARA EL CALENDARIO
function getTodayLocal() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

// ⭐ NUEVO — DETECCIÓN DE NOMBRE Y GÉNERO (para el Asesor IA)
const femaleNames = new Set([
    "maria", "ana", "laura", "carmen", "sofia", "valentina", "isabella", "camila",
    "daniela", "sara", "lucia", "paula", "andrea", "diana", "claudia", "patricia",
    "sandra", "monica", "adriana", "carolina", "juliana", "marcela", "tatiana",
    "natalia", "vanessa", "jessica", "lina", "katherine", "alejandra", "gabriela",
    "veronica", "beatriz", "elena", "rosa", "josefina", "marta", "liliana",
    "catalina", "manuela", "salome", "mariana", "ximena", "yuliana", "estefania",
    "melissa", "karen", "viviana", "angela", "gloria", "nancy", "luz", "amparo",
    "cecilia", "clara", "irene", "silvia", "teresa", "yolanda", "cristina",
    "martha", "pilar", "consuelo", "rosario", "socorro", "lorena", "danna",
    "valery", "antonia", "emilia", "renata", "julieta", "abril", "alma", "iris",
    "noa", "zoe", "luna", "sol", "bianca", "florencia", "regina", "fernanda",
    "magdalena", "ines", "raquel", "rebeca", "susana", "elisa", "aleja",
    "caro", "male", "lau", "sofi", "fer", "vale", "kata", "cami",
]);

const maleNames = new Set([
    "juan", "carlos", "jose", "luis", "pedro", "jorge", "andres", "david",
    "daniel", "felipe", "santiago", "sebastian", "mateo", "nicolas", "alejandro",
    "miguel", "javier", "fernando", "ricardo", "eduardo", "mario", "raul",
    "alberto", "roberto", "francisco", "antonio", "manuel", "pablo", "sergio",
    "oscar", "ivan", "hector", "victor", "julian", "mauricio", "gustavo",
    "wilson", "jhon", "kevin", "brayan", "cristian", "esteban", "tomas",
    "emilio", "martin", "joaquin", "rodrigo", "alfonso", "arturo", "enrique",
    "ramon", "gerardo", "alvaro", "jaime", "hugo", "diego", "samuel", "gabriel",
    "rafael", "simon", "jesus", "jhonatan", "jonathan", "steven", "bryan",
    "jair", "fabian", "dario", "omar", "camilo", "julio", "cesar", "jairo",
    "orlando", "bernardo", "gonzalo", "hernan", "nestor", "adrian", "emmanuel",
    "joshua", "josua", "luciano", "matias", "thiago", "bruno", "lorenzo",
    "benjamin", "agustin", "ignacio", "maximiliano", "facundo", "valentino",
    "lucas", "elias", "isaac", "jacobo", "axel", "dante", "pipe", "nico",
    "sebas", "santi", "feli", "juancho", "juanpi", "charlie", "chris",
]);

// Palabras que NO deben confundirse con un nombre
const nonNameWords = new Set([
    // Saludos / cortesía
    "hola", "buenas", "buenos", "gracias", "si", "no", "ok", "vale", "bueno",
    "adios", "chao", "hasta", "luego", "pronto", "por", "favor", "disculpa",
    "perdon", "excusa", "disculpe", "saludos", "tal", "bien", "mal", "muy",
    "claro", "perfecto", "genial", "excelente",
    // Prendas del catálogo
    "camisa", "camiseta", "blusa", "polo", "pantalon", "jean", "jeans",
    "vestido", "falda", "chaqueta", "uniforme", "overol", "conjunto",
    "ropa", "prenda", "sudadera", "pijama", "delantal", "chaleco",
    "antifluido", "corporativa", "empresarial", "formal", "casual",
    "elegante", "deportiva", "deportivo", "clasica", "clasico",
    "basica", "basico", "manga", "larga", "corta", "infantil", "dama",
    // Tallas
    "talla", "tallas", "xs", "xl", "xxl", "unitalla",
    // Colores
    "color", "colores", "negro", "negra", "blanco", "blanca", "azul",
    "rojo", "roja", "gris", "verde", "amarillo", "amarilla", "rosado",
    "rosada", "beige", "vino", "tinto",
    // Verbos / preguntas comunes
    "precio", "precios", "cuesta", "vale", "cuanto", "tiene", "tienen",
    "quiero", "necesito", "busco", "ver", "muestra", "muestrame",
    "catalogo", "coleccion", "producto", "articulo", "informacion",
    "que", "como", "cuando", "donde", "porque", "para", "con", "sin",
    "es", "eres", "soy", "un", "una", "uno",
    // Personas (evita "soy hombre" / "soy mujer" como nombre)
    "hombre", "mujer", "nino", "nina", "adulto", "adulta",
    "senor", "senora", "cliente", "usuario", "persona",
    // Adjetivos
    "bueno", "buena", "malo", "mala", "grande", "pequeno", "pequena",
    "nuevo", "nueva", "bonito", "bonita", "feo", "fea", "lindo", "linda",
    "alto", "alta", "bajo", "baja", "guapo", "guapa", "feliz", "triste",
    "contento", "contenta", "enojado", "enojada", "cansado", "cansada",
    // Tiempo / otros
    "dia", "noche", "tarde", "manana", "semana", "mes", "ano",
    "algo", "nada", "todo", "toda", "mucho", "mucha", "poco", "poca",
    "tambien", "solo", "sola", "aqui", "alli", "ahi",
    "casa", "tienda", "local", "oficina", "trabajo", "empresa",
    "ayuda", "asesor", "asesoria", "adios",
]);

function capitalizeWord(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Devuelve "hombre", "mujer" o "" si no se puede determinar
function detectGenderFromName(rawName) {
    const clean = normalizeText(rawName).trim();
    if (!clean) return "";

    if (femaleNames.has(clean)) return "mujer";
    if (maleNames.has(clean)) return "hombre";

    const firstName = clean.split(/\s+/)[0];
    if (femaleNames.has(firstName)) return "mujer";
    if (maleNames.has(firstName)) return "hombre";

    // Heurística: nombres que terminan en "a" (femenino) o "o" (masculino)
    const maleExceptionsEndingInA = new Set(["joshua", "josua", "isaia", "luca"]);
    if (firstName.endsWith("a") && !maleExceptionsEndingInA.has(firstName)) return "mujer";
    if (firstName.endsWith("o")) return "hombre";

    return "";
}

/**
 * Detecta un nombre cuando el usuario escribe SOLO su nombre
 * (1 o 2 palabras, sin "me llamo" ni "soy").
 */
function extractStandaloneName(message) {
    const clean = String(message).replace(/[.,!¡?¿"'()]/g, "").trim();
    if (!clean) return null;

    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length === 0 || words.length > 2) return null;

    const firstLower = normalizeText(words[0]);
    if (nonNameWords.has(firstLower)) return null;

    if (femaleNames.has(firstLower)) return { name: capitalizeWord(words[0]), gender: "mujer" };
    if (maleNames.has(firstLower)) return { name: capitalizeWord(words[0]), gender: "hombre" };

    if (words.length === 2) {
        const secondLower = normalizeText(words[1]);
        if (nonNameWords.has(secondLower)) return null;
        // 2 palabras pero ninguna conocida → no asumimos
        return null;
    }

    // Heurística -a / -o con 1 sola palabra
    if (/[ao]$/i.test(firstLower)) {
        const gender = detectGenderFromName(firstLower);
        if (gender) return { name: capitalizeWord(words[0]), gender };
    }

    return null;
}
// ⭐ FIN NUEVO

// COMPONENTE PRINCIPAL
function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        { sender: "bot", text: "¡Hola! 👋 Bienvenido a FashionBot. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?" },
    ]);

    const [input, setInput] = useState("");
    const [lastCategory, setLastCategory] = useState("");
    const [flow, setFlow] = useState("");
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [catalogCategory, setCatalogCategory] = useState("");
    const [showOptions, setShowOptions] = useState(true);

    // === Estados del Asesor IA (memoria contextual) ===
    const [isTyping, setIsTyping] = useState(false);
    const [advisorTopic, setAdvisorTopic] = useState("");
    const [advisorGender, setAdvisorGender] = useState(""); // ⭐ NUEVO: guarda "hombre" | "mujer"
    const messagesEndRef = useRef(null);

    // AGREGAR MENSAJES AL CHAT
    const addMessage = (sender, text) => {
        setMessages((previous) => [...previous, { sender, text }]);
    };

    // Auto-scroll
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    // ABRIR CATÁLOGO
    const startCatalog = (category = "") => {
        setFlow("catalog");
        setCatalogCategory(category);
        setInput("");
        if (category) {
            const categoryName = catalogCategories.find((item) => item.id === category)?.name;
            addMessage("bot", `¡Claro! 😊 Estas son las prendas disponibles en ${categoryName}. Selecciona el producto que te interese. Recuerda que los precios son provisionales.`);
        } else {
            addMessage("bot", "¡Bienvenido a nuestro catálogo! 👕 Selecciona una categoría para conocer las prendas, sus referencias y precios provisionales.");
        }
    };

    // INICIAR ASESORÍA PERSONALIZADA
    const startAdvice = () => {
        setFlow("advice");
        setStep(0);
        setFormData((prev) => ({ ...prev, adviceTarget: "", adviceOccasion: "", adviceGarment: "", adviceBudget: "" }));
        addMessage("bot", adviceSteps[0].question);
    };

    // SELECCIONAR CATEGORÍA
    const selectCatalogCategory = (category) => {
        setCatalogCategory(category);
        const categoryName = catalogCategories.find((item) => item.id === category)?.name;
        addMessage("bot", `Aquí tienes nuestro catálogo de ${categoryName}. Selecciona una prenda para conocerla o realizar tu pedido.`);
    };

    // SELECCIONAR PRODUCTO
    const selectProduct = (product) => {
        addMessage("user", `Me interesa ${product.name} (${product.reference})`);
        addMessage("bot", `¡Excelente elección! 😊\n\n${product.name}\nReferencia: ${product.reference}\nPrecio provisional: ${formatPrice(product.price)}\nTallas: ${product.sizes}\nColores: ${product.colors}\n\nVamos a completar tu pedido.`);
        startOrder(product);
    };

    // INICIAR PEDIDO
    const startOrder = (product = null) => {
        setFlow("order");
        setStep(0);
        setFormData(product ? { garment: product.name, productReference: product.reference, unitPrice: product.price, productImage: getProductImage(product) } : {});
        setInput("");
        addMessage("bot", product ? `¡Vamos a realizar tu pedido! 😊\n\nProducto: ${product.name}\nReferencia: ${product.reference}\nPrimero necesito algunos datos personales.` : "¡Vamos a realizar tu pedido! 👕 Primero necesito algunos datos.");
    };

    // INICIAR CITA
    const startAppointment = () => {
        setFlow("appointment");
        setStep(0);
        setFormData({});
        setInput("");
        addMessage("bot", "¡Con gusto! 📅 Vamos a programar tu cita. Te pediré algunos datos.");
    };

    // INICIAR CONSULTA DE PEDIDO
    const startLookup = () => {
        setFlow("lookup");
        setInput("");
        addMessage("bot", "Escribe el número de referencia de tu pedido para consultar su estado.");
    };

    // INICIAR QUEJA O RECLAMO
    const startComplaint = () => {
        setFlow("complaint");
        setStep(0);
        setFormData({});
        setInput("");
        addMessage("bot", "Lamentamos cualquier inconveniente. 😔 Vamos a registrar tu queja o reclamo para que nuestro equipo lo revise.");
    };

    // GUARDAR QUEJA O RECLAMO
    const finishComplaint = () => {
        try {
            saveConsultation({ message: formData.description, category: "Queja o reclamo", answer: JSON.stringify(formData) });
        } catch (error) {
            console.error("No se pudo guardar la queja:", error);
        }
        addMessage("bot", `¡Tu queja o reclamo fue registrada correctamente! ✅\n\nCliente: ${formData.customer}\nTeléfono: ${formData.phone}\nReferencia del pedido: ${formData.orderReference}\nTipo: ${formData.complaintType}\nDescripción: ${formData.description}\n\nNuestro equipo revisará tu caso y se pondrá en contacto contigo.`);
        setFlow(""); setStep(0); setFormData({}); setInput(""); setShowOptions(true);
    };

    // ⭐ MODIFICADO — Iniciar Asesor IA pidiendo el nombre
    const startLiveAdvisor = () => {
        setFlow("advisorMode");
        setShowOptions(false);
        setInput("");
        setAdvisorTopic("");
        setAdvisorGender("");
        addMessage(
            "bot",
            "¡Hola! 👋 Soy tu asesor personal.\n\nPara empezar, **¿cómo te llamas?** 😊 Solo escríbelo (ej: *María*, *Juan*) y te mostraré las prendas pensadas para ti. Si prefieres, también puedes preguntarme directamente por una prenda."
        );
    };

    // ⭐ MODIFICADO — Asesor IA con detección de nombre y género
    const handleAdvisorAI = (message) => {
        setIsTyping(true);
        setTimeout(() => {
            const text = normalizeText(message);
            let reply = "";
            let currentTopic = advisorTopic;
            let detectedGender = advisorGender;
            let detectedName = "";

            // ============================================================
            // 1. DETECCIÓN DE NOMBRE (explícito, standalone, o primera palabra)
            // ============================================================
            let genderFromName = "";

            // 1a. Patrón explícito: "soy Juan", "me llamo Juan", "mi nombre es Juan"
            const explicitMatch =
                message.match(/(?:me llamo|mi nombre es)\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?)/i) ||
                message.match(/\bsoy\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?)/i);

            if (explicitMatch) {
                const candidate = explicitMatch[1].trim();
                const firstWord = normalizeText(candidate.split(/\s+/)[0]);
                if (!nonNameWords.has(firstWord)) {
                    detectedName = candidate.split(/\s+/).map(capitalizeWord).join(" ");
                    genderFromName = detectGenderFromName(firstWord);
                    if (genderFromName) {
                        detectedGender = genderFromName;
                        setAdvisorGender(genderFromName);
                    }
                }
            }

            // 1b. Nombre standalone (1-2 palabras) si aún no sabemos el género
            if (!detectedName && !advisorGender) {
                const standalone = extractStandaloneName(message);
                if (standalone) {
                    detectedName = standalone.name;
                    genderFromName = standalone.gender;
                    detectedGender = standalone.gender;
                    setAdvisorGender(standalone.gender);
                }
            }

            // 1c. Primera palabra es un nombre conocido (para "Juan quiero camisas")
            if (!detectedName && !advisorGender) {
                const firstWord = normalizeText(message.split(/\s+/)[0]);
                if (femaleNames.has(firstWord) || maleNames.has(firstWord)) {
                    detectedName = capitalizeWord(message.split(/\s+/)[0]);
                    genderFromName = detectGenderFromName(firstWord);
                    detectedGender = genderFromName;
                    setAdvisorGender(genderFromName);
                }
            }

            // ============================================================
            // 2. ACTUALIZAR TEMA
            // ============================================================
            if (/camisa|camiseta|blusa|polo/.test(text)) { currentTopic = "camisa"; setAdvisorTopic(currentTopic); }
            else if (/pantalon|jean/.test(text)) { currentTopic = "pantalon"; setAdvisorTopic(currentTopic); }
            else if (/vestido|falda/.test(text)) { currentTopic = "vestido"; setAdvisorTopic(currentTopic); }
            else if (/chaqueta/.test(text)) { currentTopic = "chaqueta"; setAdvisorTopic(currentTopic); }
            else if (/uniforme|overol|conjunto/.test(text)) { currentTopic = "uniforme"; setAdvisorTopic(currentTopic); }

            // ============================================================
            // 3. DETECTAR INTENCIONES
            // ============================================================
            const asksSize = /talla|tamaño|medida/.test(text);
            const asksPrice = /precio|cuanto|cuesta|vale|costo/.test(text);
            const asksColor = /color|colores/.test(text);
            const asksCatalog = /ver catalogo|mostrar catalogo|ver la coleccion|ver todo el catalogo|muestrame el catalogo|ver coleccion|quiero ver el catalogo/.test(text);

            // ============================================================
            // 4. SI PIDE EL CATÁLOGO → ABRIR CATÁLOGO FILTRADO POR GÉNERO
            // ============================================================
            if (asksCatalog) {
                const targetCategory = detectCategory(message) || detectedGender;
                setIsTyping(false);
                startCatalog(targetCategory);
                return;
            }

            // ============================================================
            // 5. BUSCAR COINCIDENCIA EXACTA POR NOMBRE (en todo el catálogo)
            // ============================================================
            const exactProduct = products.find((p) => {
                const productName = normalizeText(p.name);
                return productName.length > 4 && text.includes(productName);
            });

            // ============================================================
            // 6. SI SOLO DIO EL NOMBRE → MOSTRAR CATÁLOGO PREVIEW POR GÉNERO
            // ============================================================
            const onlyNameGiven =
                detectedName && genderFromName &&
                !currentTopic && !asksSize && !asksPrice && !asksColor && !exactProduct;

            if (onlyNameGiven) {
                const genderProducts = products
                    .filter((p) => p.category === genderFromName)
                    .slice(0, 4);
                const preview = genderProducts
                    .map((p) => `• ${p.name} (${p.reference}): ${formatPrice(p.price)}`)
                    .join("\n");
                const collectionName = genderFromName === "mujer" ? "femenina 👗" : "masculina 👔";
                const pronoun = genderFromName === "mujer" ? "mujer" : "hombre";
                addMessage(
                    "bot",
                    `¡Un gusto saludarte, ${detectedName}! 😊\n\n` +
                    `Veo que eres ${pronoun}, así que te comparto prendas destacadas de nuestra colección ${collectionName}:\n\n` +
                    `${preview}\n\n` +
                    `¿Te interesa alguna en particular? Puedo darte tallas, colores y precios. O escribe **"ver catálogo"** para abrir el catálogo completo.`
                );
                setIsTyping(false);
                return;
            }

            // ============================================================
            // 7. SALUDO SI DIO EL NOMBRE (con otra intención)
            // ============================================================
            if (detectedName) {
                reply = `¡Un gusto saludarte, ${detectedName}! 😊 `;
            }

            // ============================================================
            // 8. FILTRAR PRODUCTOS (por categoría explícita o por género)
            // ============================================================
            let matches = products;
            const explicitCategory = detectCategory(message);
            if (explicitCategory) {
                matches = matches.filter((p) => p.category === explicitCategory);
            } else if (detectedGender) {
                const genderMatches = matches.filter((p) => p.category === detectedGender);
                if (genderMatches.length > 0) matches = genderMatches;
            }

            if (currentTopic) {
                if (currentTopic === "camisa") matches = matches.filter((p) => /camisa|camiseta|blusa|polo/.test(normalizeText(p.name)));
                else if (currentTopic === "pantalon") matches = matches.filter((p) => /pantalon|jean/.test(normalizeText(p.name)));
                else if (currentTopic === "vestido") matches = matches.filter((p) => /vestido|falda/.test(normalizeText(p.name)));
                else if (currentTopic === "chaqueta") matches = matches.filter((p) => /chaqueta/.test(normalizeText(p.name)));
                else if (currentTopic === "uniforme") matches = matches.filter((p) => /uniforme|overol|conjunto/.test(normalizeText(p.name)));
            }

            // ============================================================
            // 9. GENERAR RESPUESTA
            // ============================================================
            if (exactProduct) {
                if (asksSize) reply += `La **${exactProduct.name}** está disponible en las tallas: **${exactProduct.sizes}**.`;
                else if (asksPrice) reply += `La **${exactProduct.name}** tiene un valor de **${formatPrice(exactProduct.price)}**.`;
                else if (asksColor) reply += `La **${exactProduct.name}** está disponible en los colores: ${exactProduct.colors}.`;
                else reply += `¡Tenemos la **${exactProduct.name}**! Su precio es ${formatPrice(exactProduct.price)}, tallas ${exactProduct.sizes} y colores ${exactProduct.colors}. ¿Te gustaría pedirla?`;
            } else if (matches.length > 0) {
                if (asksSize) {
                    const items = matches.slice(0, 4).map((p) => `• ${p.name}: ${p.sizes}`).join("\n");
                    reply += `Con gusto. Aquí tienes las tallas disponibles:\n\n${items}\n\n¿Te interesa alguna en particular?`;
                } else if (asksPrice) {
                    const items = matches.slice(0, 4).map((p) => `• ${p.name}: ${formatPrice(p.price)}`).join("\n");
                    reply += `Estos son los precios:\n\n${items}\n\n¿Quieres saber algo más o realizar un pedido?`;
                } else if (asksColor) {
                    const items = matches.slice(0, 4).map((p) => `• ${p.name}: ${p.colors}`).join("\n");
                    reply += `Estos son los colores disponibles:\n\n${items}\n\n¿Cuál te gusta más?`;
                } else {
                    const items = matches.slice(0, 4).map((p) => `• ${p.name} (${p.reference}): ${formatPrice(p.price)}`).join("\n");
                    reply += `Aquí tienes algunas opciones:\n\n${items}\n\n¿Te gustaría saber las tallas, los colores o realizar un pedido?`;
                }
            } else {
                if (asksSize) reply += "Manejamos tallas desde XS hasta XXL en adultos, y del 2 al 12 en niños. ¿De qué prenda te gustaría saber las tallas?";
                else if (asksPrice) reply += "Nuestros precios van desde $30.000 hasta $145.000. ¿Qué tipo de prenda buscas para darte el precio exacto?";
                else if (!reply) reply = "Entiendo. Para poder ayudarte mejor, ¿podrías decirme qué tipo de prenda buscas (camisa, pantalón, vestido) y para quién es?";
                else reply += "¿En qué más te puedo ayudar?";
            }

            // Si aún no conocemos el género, invitar amablemente a decir el nombre
            if (!detectedGender && !detectedName) {
                reply += "\n\n💡 *Por cierto, si me dices tu nombre te mostraré prendas pensadas para ti.*";
            }

            addMessage("bot", reply);
            setIsTyping(false);
        }, 1500);
    };
    // === FIN ASESOR IA ===

    // GUARDAR PEDIDO
    const finishOrder = () => {
        const totalPrice = formData.unitPrice ? formData.unitPrice * Number(formData.quantity) : null;
        const order = saveOrder({ ...formData, totalPrice });
        if (!order) { addMessage("bot", "No pudimos guardar tu pedido. Por favor, inténtalo nuevamente."); return; }
        addMessage("bot", `¡Tu pedido fue registrado correctamente! ✅\n\nReferencia del pedido: ${order.reference}\n${order.productReference ? `Referencia del producto: ${order.productReference}` : ""}\n\nCliente: ${order.customer}\nTeléfono: ${order.phone}\nPrenda: ${order.garment}\nTalla: ${order.size}\nColor: ${order.color}\nCantidad: ${order.quantity}\n${order.unitPrice ? `Precio por unidad: ${formatPrice(order.unitPrice)}` : ""}\n${order.totalPrice ? `TOTAL: ${formatPrice(order.totalPrice)}` : "Precio: pendiente de cotización"}\n\nEstado: ${order.status}\n\nGuarda tu número de referencia para consultar tu pedido.`);
        setFlow(""); setStep(0); setFormData({}); setInput(""); setShowOptions(true);
    };

    // GUARDAR CITA
    const finishAppointment = () => {
        const appointment = saveAppointment(formData);
        if (!appointment) { addMessage("bot", "No pudimos guardar tu cita. Por favor, inténtalo nuevamente."); return; }
        addMessage("bot", `¡Tu cita fue registrada correctamente! ✅\n\nReferencia: ${appointment.reference}\n\nCliente: ${appointment.customer}\nTeléfono: ${appointment.phone}\nFecha: ${appointment.date}\nHora: ${appointment.time}\nMotivo: ${appointment.reason}\n\nEstado: ${appointment.status}\n\nGuarda tu número de referencia.`);
        setFlow(""); setStep(0); setFormData({}); setInput(""); setShowOptions(true);
    };

    // PROCESAR RESPUESTAS DE LOS FORMULARIOS
    const handleFlowSubmit = (value) => {
        if (flow === "lookup") {
            const reference = String(value).trim().toUpperCase();
            if (!reference) return;
            addMessage("user", reference);
            const order = getOrders().find((item) => item.reference.toUpperCase() === reference);
            if (order) {
                addMessage("bot", `¡Encontramos tu pedido! ✅\n\nReferencia: ${order.reference}\n${order.productReference ? `Referencia del producto: ${order.productReference}` : ""}\nCliente: ${order.customer}\nPrenda: ${order.garment}\nTalla: ${order.size}\nColor: ${order.color}\nCantidad: ${order.quantity}\n${order.totalPrice ? `Total: ${formatPrice(order.totalPrice)}` : ""}\n\nEstado: ${order.status}`);
            } else {
                addMessage("bot", "No encontramos un pedido con esa referencia. Verifica el número e inténtalo nuevamente.");
            }
            setFlow(""); setInput(""); setShowOptions(true);
            return;
        }

        const steps = flow === "order" ? orderSteps : flow === "appointment" ? appointmentSteps : flow === "advice" ? adviceSteps : flow === "complaint" ? complaintSteps : [];
        const currentStep = steps[step];
        if (!currentStep) return;

        const cleanValue = String(value ?? "").trim();
        if (!cleanValue) return;

        if (currentStep.key === "phone" && !/^\+?\d{7,15}$/.test(cleanValue.replace(/[\s()-]/g, ""))) {
            addMessage("bot", "Por favor, ingresa un número de teléfono válido."); return;
        }
        if (currentStep.key === "customer" && cleanValue.length < 3) {
            addMessage("bot", "Por favor, escribe tu nombre completo."); return;
        }
        if (currentStep.key === "quantity" && (!Number.isInteger(Number(cleanValue)) || Number(cleanValue) < 1 || Number(cleanValue) > 500)) {
            addMessage("bot", "Ingresa una cantidad entera entre 1 y 500."); return;
        }
        if (currentStep.key === "date") {
            const selectedDate = new Date(`${cleanValue}T00:00:00`);
            const today = new Date(getTodayLocal() + "T00:00:00");
            if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
                addMessage("bot", "Selecciona una fecha válida desde hoy en adelante."); return;
            }
        }

        const updatedData = { ...formData, [currentStep.key]: cleanValue };
        setFormData(updatedData);
        addMessage("user", cleanValue);

        if (step < steps.length - 1) {
            if (flow === "order" && currentStep.key === "phone" && formData.productReference) setStep(3);
            else setStep(step + 1);
        } else {
            setStep(steps.length);
        }
        setInput("");
    };

    // ENVIAR MENSAJES NORMALES
    const sendMessage = (customMessage) => {
        let message = (customMessage ?? input).trim();
        if (!message) return;

        if (flow === "advisorMode") {
            addMessage("user", message);
            setInput("");
            handleAdvisorAI(message);
            return;
        }

        if (/^[1-7]$/.test(message)) message = options[Number(message) - 1];
        addMessage("user", message);
        setInput("");
        const normalized = normalizeText(message);

        const foundProduct = products.find((product) => normalized.includes(normalizeText(product.reference)));
        if (foundProduct) {
            addMessage("bot", `¡Encontré el producto que buscas! 😊\n\n${foundProduct.name}\nReferencia: ${foundProduct.reference}\nPrecio provisional: ${formatPrice(foundProduct.price)}\nTallas: ${foundProduct.sizes}\nColores: ${foundProduct.colors}\n\nSi deseas verlo en el catálogo, escribe 'ver catálogo'.`);
            return;
        }

        if (/ver catalogo|mostrar catalogo|catalogo|ver prendas|mostrar prendas|que prendas tienen|que ropa tienen/.test(normalized)) {
            startCatalog(detectCategory(message)); return;
        }

        if (/hablar con un asesor|contactar asesor|asesor humano|persona real|agente humano|quiero un asesor|asesor en vivo/.test(normalized)) {
            startLiveAdvisor(); return;
        }

        if (/asesor|asesoria|asesorar|orientacion|recomendacion|recomendar|aconsejar|ayuda para elegir/.test(normalized)) {
            startAdvice(); return;
        }

        if (/recomiend|recomend|busco ropa|estoy buscando|necesito ropa|quiero ropa/.test(normalized)) {
            const category = detectCategory(message);
            startCatalog(category);
            addMessage("bot", "¡Con gusto te ayudo a encontrar algo! Puedes explorar las prendas y sus precios. Si me cuentas tu presupuesto y para quién es la ropa, podremos orientar mejor tu elección.");
            return;
        }

        if (/precio|costo|valor|cuesta|cotizacion|cotizar/.test(normalized)) {
            startCatalog(detectCategory(message)); return;
        }

        if (/realizar un pedido|hacer un pedido|quiero comprar|comprar/.test(normalized)) {
            startCatalog(detectCategory(message)); return;
        }

        if (/agendar una cita|programar una cita|quiero una cita/.test(normalized)) {
            startAppointment(); return;
        }

        if (/consultar un pedido|estado de mi pedido|buscar pedido/.test(normalized)) {
            startLookup(); return;
        }

        if (/consultar informacion|informacion general|necesito informacion|dame informacion/.test(normalized)) {
            addMessage("bot", `¡Con gusto! 😊 En FashionBot puedes consultar la siguiente información:\n\n👕 Catálogo: ropa para hombre, mujer, niños y uniformes empresariales.\n💰 Precios: consulta precios de referencia en nuestro catálogo.\n📏 Tallas y colores: cada prenda tiene tallas y colores disponibles.\n✂️ Confección a la medida: manejamos diseños personalizados.\n📅 Citas: agenda asesoría o toma de medidas.\n📦 Pedidos: realiza pedidos y consulta su estado.\n📝 Quejas y reclamos: registramos tus solicitudes.\n\n¿Sobre cuál de estos temas deseas más información?`);
            return;
        }

        if (/presentar una queja|presentar un reclamo|poner una queja|poner un reclamo|quiero quejarme|quiero reclamar/.test(normalized)) {
            startComplaint(); return;
        }

        const result = classifyMessage(message);
        setLastCategory(result.category);
        addMessage("bot", result.answer);
        try { saveConsultation({ message, category: result.category, answer: result.answer }); } catch (error) { }
    };

    // CANCELAR OPERACIÓN
    const cancelFlow = () => {
        const canceledFlow = flow;
        setFlow(""); setStep(0); setFormData({}); setInput(""); setCatalogCategory(""); setShowOptions(true);
        setAdvisorTopic("");
        setAdvisorGender(""); // ⭐ NUEVO: limpiar memoria de género

        const operation =
            canceledFlow === "order" ? "pedido"
                : canceledFlow === "appointment" ? "cita"
                    : canceledFlow === "catalog" ? "exploración del catálogo"
                        : canceledFlow === "complaint" ? "queja o reclamo"
                            : canceledFlow === "advisorMode" ? "asesoría con IA"
                                : "consulta";

        addMessage("bot", `Tu ${operation} ha sido cancelado. ¿En qué más puedo ayudarte?`);
    };

    // PASO ACTUAL
    const currentOrderStep = orderSteps[step];
    const currentAppointmentStep = appointmentSteps[step];

    // PRODUCTOS DE LA CATEGORÍA SELECCIONADA
    const visibleProducts = products.filter((product) => !catalogCategory || product.category === catalogCategory);

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    {/* ENCABEZADO */}
                    <div className="chatbot-header">
                        <div className="chatbot-avatar"><i className="bi bi-robot"></i></div>
                        <div className="chatbot-heading">
                            <strong>FashionBot</strong>
                            <span><i className="bi bi-circle-fill"></i> Asistente virtual</span>
                        </div>
                        <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Cerrar chat"><i className="bi bi-x-lg"></i></button>
                    </div>

                    {/* MENSAJES */}
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message-row ${message.sender}`}>
                                <div className="message-bubble">{message.text}</div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="message-row bot">
                                <div className="message-bubble" style={{ fontStyle: "italic", color: "#888" }}>
                                    Escribiendo...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />

                        {/* OPCIONES INICIALES */}
                        {showOptions && !flow && (
                            <div className="chat-quick-options">
                                <p>Selecciona una opción:</p>
                                {options.map((option, index) => (
                                    <button key={option} onClick={() => sendMessage(option)}>
                                        <span className="option-number">{index + 1}.</span> {option} <i className="bi bi-chevron-right"></i>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* CATÁLOGO DENTRO DEL CHAT */}
                        {flow === "catalog" && (
                            <div className="chat-catalog">
                                <div className="chat-catalog-heading">
                                    <strong>Catálogo FashionBot</strong>
                                    <span>Precios provisionales de demostración</span>
                                </div>
                                <div className="chat-catalog-categories">
                                    {catalogCategories.map((category) => (
                                        <button key={category.id} className={catalogCategory === category.id ? "active" : ""} onClick={() => selectCatalogCategory(category.id)}>
                                            <i className={`bi ${category.icon}`}></i> {category.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="chat-catalog-results">
                                    {visibleProducts.map((product) => (
                                        <div className="chat-product-card" key={product.reference}>
                                            <img src={getProductImage(product)} alt={product.name} loading="lazy" />
                                            <div className="chat-product-info">
                                                <strong>{product.name}</strong>
                                                <span>Ref. {product.reference}</span>
                                                <b>{formatPrice(product.price)}</b>
                                                <small>Tallas: {product.sizes}</small>
                                                <small>Colores: {product.colors}</small>
                                                <small className="chat-provisional">Precio provisional</small>
                                                <button onClick={() => selectProduct(product)}>Elegir esta prenda</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="chat-cancel" onClick={cancelFlow}>Volver a la conversación</button>
                            </div>
                        )}

                        {/* FORMULARIO DE PEDIDO */}
                        {flow === "order" && step < orderSteps.length && (
                            <div className="chat-form-step">
                                <p>{currentOrderStep.question}</p>
                                {currentOrderStep.choices ? (
                                    <div className="chat-choice-list">
                                        {currentOrderStep.choices.map((choice) => (
                                            <button key={choice} onClick={() => handleFlowSubmit(choice)}>{choice}</button>
                                        ))}
                                    </div>
                                ) : (
                                    <form onSubmit={(event) => { event.preventDefault(); handleFlowSubmit(input); }}>
                                        <input
                                            type={currentOrderStep.type}
                                            min={currentOrderStep.type === "number" ? "1" : undefined}
                                            max={currentOrderStep.type === "number" ? "500" : undefined}
                                            value={input}
                                            onChange={(event) => setInput(event.target.value)}
                                            placeholder="Escribe tu respuesta..."
                                            required
                                        />
                                        <button type="submit">Continuar</button>
                                    </form>
                                )}
                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar pedido</button>
                            </div>
                        )}

                        {/* FORMULARIO DE ASESORÍA PERSONALIZADA */}
                        {flow === "advice" && step < adviceSteps.length && (
                            <div className="chat-form-step">
                                <p>{adviceSteps[step].question}</p>
                                <div className="chat-choice-list">
                                    {adviceSteps[step].choices.map((choice) => (
                                        <button key={choice} onClick={() => handleFlowSubmit(choice)}>{choice}</button>
                                    ))}
                                </div>

                                <button
                                    onClick={startLiveAdvisor}
                                    style={{ backgroundColor: "#0066cc", color: "#fff", border: "none", fontWeight: "bold", padding: "10px 14px", borderRadius: 8, margin: "12px 0 8px 0", width: "100%", cursor: "pointer" }}
                                >
                                    <i className="bi bi-headset"></i> Hablar con un asesor en vivo
                                </button>

                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar asesoría</button>
                            </div>
                        )}

                        {/* RESULTADOS DE LA ASESORÍA */}
                        {flow === "advice" && step === adviceSteps.length && (
                            <div className="chat-catalog">
                                <div className="chat-catalog-heading">
                                    <strong>¡Estas son nuestras recomendaciones! 👗</strong>
                                    <span>Seleccionamos prendas según tus preferencias y presupuesto.</span>
                                </div>
                                {getAdviceRecommendations(formData).length > 0 ? (
                                    <div className="chat-catalog-results">
                                        {getAdviceRecommendations(formData).slice(0, 4).map((product) => (
                                            <div className="chat-product-card" key={product.reference}>
                                                <img src={getProductImage(product)} alt={product.name} loading="lazy" />
                                                <div className="chat-product-info">
                                                    <strong>{product.name}</strong>
                                                    <span>Ref. {product.reference}</span>
                                                    <b>{formatPrice(product.price)}</b>
                                                    <small>Tallas: {product.sizes}</small>
                                                    <small>Colores: {product.colors}</small>
                                                    <button onClick={() => selectProduct(product)}>Elegir esta prenda</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No encontramos prendas que coincidan exactamente con tus preferencias. Puedes explorar nuestro catálogo para conocer otras opciones.</p>
                                )}

                                <button
                                    onClick={startLiveAdvisor}
                                    style={{ backgroundColor: "#0066cc", color: "#fff", border: "none", fontWeight: "bold", padding: "10px 14px", borderRadius: 8, margin: "8px 0", width: "100%", cursor: "pointer" }}
                                >
                                    <i className="bi bi-headset"></i> Hablar con un asesor en vivo
                                </button>

                                <button className="chat-cancel" onClick={() => startCatalog(formData.adviceTarget === "Hombre" ? "hombre" : formData.adviceTarget === "Mujer" ? "mujer" : formData.adviceTarget === "Niño o niña" ? "ninos" : "empresarial")}>
                                    Explorar catálogo completo
                                </button>
                                <button className="chat-cancel" onClick={cancelFlow}>Finalizar asesoría</button>
                                <button className="chat-cancel" onClick={() => { setFlow(""); setStep(0); setFormData({}); setCatalogCategory(""); setInput(""); setShowOptions(true); addMessage("bot", "¡Volviste al menú principal! 😊 Selecciona qué deseas hacer."); }}>
                                    Volver a las opciones principales
                                </button>
                            </div>
                        )}

                        {/* CONFIRMAR PEDIDO */}
                        {flow === "order" && step === orderSteps.length && (
                            <div className="chat-form-step">
                                <p>Revisa los datos de tu pedido:</p>
                                <div className="order-summary">
                                    {formData.productImage && <div className="order-product-image"><img src={formData.productImage} alt={formData.garment} /></div>}
                                    {formData.productReference && <p><strong>Referencia:</strong> {formData.productReference}</p>}
                                    <p><strong>Cliente:</strong> {formData.customer}</p>
                                    <p><strong>Teléfono:</strong> {formData.phone}</p>
                                    <p><strong>Prenda:</strong> {formData.garment}</p>
                                    <p><strong>Talla:</strong> {formData.size}</p>
                                    <p><strong>Color:</strong> {formData.color}</p>
                                    <p><strong>Cantidad:</strong> {formData.quantity}</p>
                                    {formData.unitPrice && (
                                        <>
                                            <p><strong>Precio por unidad:</strong> {formatPrice(formData.unitPrice)}</p>
                                            <p><strong>Total:</strong> {formatPrice(formData.unitPrice * Number(formData.quantity))}</p>
                                        </>
                                    )}
                                </div>
                                <button onClick={finishOrder}><i className="bi bi-check-circle"></i> Confirmar pedido</button>
                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar</button>
                            </div>
                        )}

                        {/* FORMULARIO DE CITA */}
                        {flow === "appointment" && step < appointmentSteps.length && (
                            <div className="chat-form-step">
                                <p>{currentAppointmentStep.question}</p>
                                {currentAppointmentStep.choices ? (
                                    <div className="chat-choice-list">
                                        {currentAppointmentStep.choices.map((choice) => (
                                            <button key={choice} onClick={() => handleFlowSubmit(choice)}>{choice}</button>
                                        ))}
                                    </div>
                                ) : (
                                    <form onSubmit={(event) => { event.preventDefault(); handleFlowSubmit(input); }}>
                                        <input
                                            type={currentAppointmentStep.type}
                                            min={currentAppointmentStep.type === "date" ? getTodayLocal() : undefined}
                                            value={input}
                                            onChange={(event) => setInput(event.target.value)}
                                            placeholder="Escribe tu respuesta..."
                                            required
                                        />
                                        <button type="submit">Continuar</button>
                                    </form>
                                )}
                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar cita</button>
                            </div>
                        )}

                        {/* CONFIRMAR CITA */}
                        {flow === "appointment" && step === appointmentSteps.length && (
                            <div className="chat-form-step">
                                <p>Revisa los datos de tu cita:</p>
                                <div className="order-summary">
                                    <p><strong>Cliente:</strong> {formData.customer}</p>
                                    <p><strong>Teléfono:</strong> {formData.phone}</p>
                                    <p><strong>Fecha:</strong> {formData.date}</p>
                                    <p><strong>Hora:</strong> {formData.time}</p>
                                    <p><strong>Motivo:</strong> {formData.reason}</p>
                                </div>
                                <button onClick={finishAppointment}><i className="bi bi-calendar-check"></i> Confirmar cita</button>
                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar</button>
                            </div>
                        )}

                        {/* CONSULTAR PEDIDO */}
                        {flow === "lookup" && (
                            <div className="chat-form-step">
                                <form onSubmit={(event) => { event.preventDefault(); handleFlowSubmit(input); }}>
                                    <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ej. FB-12345678" required />
                                    <button type="submit">Consultar pedido</button>
                                </form>
                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar consulta</button>
                            </div>
                        )}

                        {/* FORMULARIO DE QUEJA */}
                        {flow === "complaint" && step < complaintSteps.length && (
                            <div className="chat-form-step">
                                <p>{complaintSteps[step].question}</p>
                                {complaintSteps[step].choices ? (
                                    <div className="chat-choice-list">
                                        {complaintSteps[step].choices.map((choice) => (
                                            <button key={choice} onClick={() => handleFlowSubmit(choice)}>{choice}</button>
                                        ))}
                                    </div>
                                ) : (
                                    <form onSubmit={(event) => { event.preventDefault(); handleFlowSubmit(input); }}>
                                        <input
                                            type={complaintSteps[step].type}
                                            value={input}
                                            onChange={(event) => setInput(event.target.value)}
                                            placeholder="Escribe tu respuesta..."
                                            required
                                        />
                                        <button type="submit">Continuar</button>
                                    </form>
                                )}
                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar queja</button>
                            </div>
                        )}

                        {/* CONFIRMAR QUEJA */}
                        {flow === "complaint" && step === complaintSteps.length && (
                            <div className="chat-form-step">
                                <p>Revisa los datos de tu queja o reclamo:</p>
                                <div className="order-summary">
                                    <p><strong>Cliente:</strong> {formData.customer}</p>
                                    <p><strong>Teléfono:</strong> {formData.phone}</p>
                                    <p><strong>Referencia del pedido:</strong> {formData.orderReference}</p>
                                    <p><strong>Tipo:</strong> {formData.complaintType}</p>
                                    <p><strong>Descripción:</strong> {formData.description}</p>
                                </div>
                                <button onClick={finishComplaint}><i className="bi bi-check-circle"></i> Confirmar queja</button>
                                <button className="chat-cancel" onClick={cancelFlow}>Cancelar</button>
                            </div>
                        )}

                    </div>

                    {/* CAMPO DE MENSAJES */}
                    {(!flow || flow === "advisorMode") && (
                        <form
                            className="chatbot-input"
                            onSubmit={(event) => {
                                event.preventDefault();
                                sendMessage();
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                placeholder={
                                    flow === "advisorMode"
                                        ? (advisorGender
                                            ? "Pregúntame por prendas, tallas o precios..."
                                            : "Escribe tu nombre o pregunta por una prenda...")
                                        : "Escribe tu mensaje..."
                                }
                                aria-label="Escribe tu mensaje"
                            />
                            <button type="submit" aria-label="Enviar mensaje">
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </form>
                    )}

                    {/* Botón para salir del Modo Asesor IA */}
                    {flow === "advisorMode" && (
                        <button
                            className="chat-cancel"
                            style={{ width: "100%", border: "none", background: "#f8f9fa", padding: "10px", cursor: "pointer", borderTop: "1px solid #eee", fontSize: "14px", color: "#666" }}
                            onClick={cancelFlow}
                        >
                            Finalizar asesoría
                        </button>
                    )}

                    {/* CLASIFICACIÓN */}
                    {lastCategory && !flow && (
                        <div className="chatbot-classification">
                            <i className="bi bi-tags"></i> Última consulta: {lastCategory}
                        </div>
                    )}
                </div>
            )}

            {/* BOTÓN FLOTANTE */}
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir asistente virtual">
                <i className={isOpen ? "bi bi-x-lg" : "bi bi-chat-dots-fill"}></i>
            </button>
        </div>
    );
}

export default Chatbot;