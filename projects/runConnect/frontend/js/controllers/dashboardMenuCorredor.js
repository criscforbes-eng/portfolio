// dashboardMenuCorredor.js
import apiCorredor from '../services/apiCorredor.js';
import apiCarrera from '../services/apiCarrera.js';

window.addEventListener("DOMContentLoaded", async () => {

    // Mostrar info del corredor en etiquetas
    document.getElementById("lblCorreoCorredor").textContent =
        localStorage.getItem("usuarioCorreo");
    document.getElementById("lblRolCorredor").textContent =
        localStorage.getItem("usuarioRol");

    console.log("Correo guardado:", localStorage.getItem("usuarioCorreo"));
    console.log("Rol:", localStorage.getItem("usuarioRol"));
    console.log("UsuarioId:", localStorage.getItem("usuarioId"));
    console.log("CorredorId:", localStorage.getItem("corredorId"));

    listarCarrerasCorredor();
});

async function listarCarrerasCorredor() {
    try {
        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {
            console.warn("No se encontró usuarioId en localStorage");
            return;
        }

        // Obtener corredor usando usuarioId (este endpoint hace populate)
        const corredor = await apiCorredor.obtenerCorredorByUsuarioId(usuarioId);

        if (!corredor?.carrerasInscritas?.length) {
            console.log("El corredor no tiene carreras inscritas");
            return;
        }

        const inscripciones = corredor.carrerasInscritas;
        const tbl = document.getElementById("tblCarreras");
        tbl.innerHTML = "";

        for (let i = 0; i < inscripciones.length; i++) {
            const ins = inscripciones[i];

            const carrera = await apiCarrera.obtenerCarreraById(ins.carreraId);

            let fila = tbl.insertRow();
            fila.insertCell().innerHTML = carrera._id;
            fila.insertCell().innerHTML = carrera.nombre;
            fila.insertCell().innerHTML = carrera.lugar;
            fila.insertCell().innerHTML = carrera.fechaHoraInicio;
            fila.insertCell().innerHTML = carrera.fechaCreacion;
            fila.insertCell().innerHTML = carrera.precio;
            fila.insertCell().innerHTML = carrera.cuposDisponibles;
            fila.insertCell().innerHTML = carrera.inscripciones?.length || 0;
            fila.insertCell().innerHTML = carrera.imagen ? "✔️" : "-";

            const btn = document.createElement("button");
            btn.textContent = "Ver detalles";
            btn.onclick = () => cargarCarrera(carrera._id);
            fila.insertCell().appendChild(btn);
        }

    } catch (e) {
        console.error("Error cargando carreras del corredor:", e);
    }
}

function cargarCarrera(carreraId) {
    console.log("Ver detalles de la carrera:", carreraId);
}

document.getElementById("btnSalir").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
});



