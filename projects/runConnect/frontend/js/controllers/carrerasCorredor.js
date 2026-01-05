import apiCarrera from "../services/apiCarrera.js";
import { obtenerUsuarioById } from "../services/apiUsuario.js"; 

// Ejecutar automáticamente al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    console.log("Correo:", localStorage.getItem("usuarioCorreo"));
    console.log("Rol:", localStorage.getItem("usuarioRol"));
    console.log("UsuarioId:", localStorage.getItem("usuarioId"));
    console.log("CorredorId:", localStorage.getItem("corredorId"));

    listarCarrerasDisponibles();
    activarBuscador();
    activarFiltroEstado();
});

// LISTAR TODAS LAS CARRERAS DISPONIBLES
export async function listarCarrerasDisponibles() {
    try {
        const carreras = await apiCarrera.listarCarreras();
        mostrarCarrerasEnTabla(carreras, carreras.length);
    } catch (error) {
        console.error("Error listando carreras:", error);
    }
}

// formato de fecha
function formatearFecha(fecha) {
    if (!fecha) return "N/A";
    return new Date(fecha).toLocaleString("es-CR", {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

// MOSTRAR CARRERAS EN TABLA + ACTUALIZAR CONTADOR
function mostrarCarrerasEnTabla(carreras, totalOriginal) {
    const tbl = document.querySelector("#tablaCarreras tbody");
    if (!tbl) return;

    tbl.innerHTML = "";

    carreras.forEach(carrera => {
        const fila = tbl.insertRow();

        // Datos de la carrera
        fila.insertCell().innerHTML = carrera.id || "N/A";
        fila.insertCell().innerHTML = carrera.nombre;
        fila.insertCell().innerHTML = carrera.lugar;
        fila.insertCell().innerHTML = formatearFecha(carrera.fechaHoraInicio);
        fila.insertCell().innerHTML = formatearFecha(carrera.fechaCreacion);
        fila.insertCell().innerHTML = carrera.precio;
        fila.insertCell().innerHTML = carrera.cuposDisponibles;
        fila.insertCell().innerHTML = carrera.inscritos;
        fila.insertCell().innerHTML = "Cargando..."; 
        fila.insertCell().innerHTML = carrera.estado || "Desconocido";

        fila.insertCell().innerHTML = carrera.imagen
            ? `<img src="${carrera.imagen}" width="70">`
            : "-";

        const celdaBtn = fila.insertCell();
        const btn = document.createElement("button");
        btn.textContent = "Inscribirse";
        btn.classList.add("btnInscribir");

        btn.onclick = () => {
            localStorage.setItem("carreraSeleccionada", JSON.stringify(carrera));
            window.location.href = "inscripcionACarreraCorredor.html";
        };

        celdaBtn.appendChild(btn);

        // Obtener nombre del organizador desde su ID
        if (carrera.organizador) {
            obtenerUsuarioById(carrera.organizador)
                .then(usuario => {
                    fila.cells[8].innerHTML = usuario?.nombre || "Sin organizador";
                })
                .catch(() => {
                    fila.cells[8].innerHTML = "Sin organizador";
                });
        } else {
            fila.cells[8].innerHTML = "Sin organizador";
        }
    });

    actualizarContador(carreras.length, totalOriginal);
}


// Actualiza el contador "Mostrando X de Y carreras"
function actualizarContador(mostrando, total) {
    const lbl = document.getElementById("contadorCarreras");
    if (!lbl) return;

    lbl.textContent = `Mostrando ${mostrando} de ${total} carreras`;
}

// BUSCAR CARRERA POR PALABRA 
function activarBuscador() {
    const inputBuscarNombre = document.getElementById("buscarNombre");

    if (!inputBuscarNombre) return;

    inputBuscarNombre.addEventListener("input", async (e) => {
        const palabra = e.target.value.trim();

        // Si se borra el texto → mostrar todo
        if (palabra.length === 0) {
            listarCarrerasDisponibles();
            return;
        }

        const todas = await apiCarrera.listarCarreras();
        const filtradas = await apiCarrera.obtenerCarreraByWord(palabra);

        mostrarCarrerasEnTabla(filtradas, todas.length);
    });
}

// FILTRAR CARRERAS POR ESTADO
function activarFiltroEstado() {
    const selectEstado = document.getElementById("filtroEstado");

    if (!selectEstado) return;

    selectEstado.addEventListener("change", async (e) => {
        const estadoSeleccionado = e.target.value;

        const todas = await apiCarrera.listarCarreras();

        if (estadoSeleccionado === "" || estadoSeleccionado === "todos") {
            mostrarCarrerasEnTabla(todas, todas.length);
            return;
        }

        // FILTRAR FRONTEND usando estado normalizado del modelo Carrera
        const filtradas = todas.filter(c => c.estado === estadoSeleccionado);

        mostrarCarrerasEnTabla(filtradas, todas.length);
    });
}

