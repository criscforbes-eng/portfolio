import apiOrganizador from '../services/apiOrganizador.js';
import apiCarrera from '../services/apiCarrera.js';
import {Carrera} from '../models/carrera.js';

// Ejecutar automáticamente al cargar la página
window.addEventListener("DOMContentLoaded", () => {

    //cargar la info del organizador en el html
    document.getElementById("lblCorreoOrganizador").textContent =
        localStorage.getItem("usuarioCorreo");
    document.getElementById("lblRolOrganizador").textContent =
        localStorage.getItem("usuarioRol");
        
    //mostrar info del organizador en consola
    console.log("Correo guardado:", localStorage.getItem("usuarioCorreo"));
    console.log("Rol:", localStorage.getItem("usuarioRol"));
    console.log("UsuarioId:", localStorage.getItem("usuarioId"));
    console.log("OrganizadorId:", localStorage.getItem("organizadorId"));

    listarCarrerasOrganizador();
});

async function listarCarrerasOrganizador() {
    try {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) return;

        const organizador = await apiOrganizador.obtenerOrganizadorByUsuarioId(usuarioId);

        if (!organizador?.carrerasCreadas?.length) return;

        const carreras = organizador.carrerasCreadas;
        const tbl = document.getElementById("tblCarreras");
        tbl.innerHTML = "";

        for (let i = 0; i < carreras.length; i++) {
            const carrera = carreras[i]; 

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
        console.error(e);
    }
}

// Definimos la función cargarCarrera para que no haya error en consola
function cargarCarrera(carreraId) {
    console.log("Ver detalles de la carrera:", carreraId);
    
}

// Botón crearCarrera para múltiples botones
document.addEventListener("DOMContentLoaded", () => {
    const botonesCrearCarrera = document.querySelectorAll(".btnCrearCarrera, .sct3Btn2");

    botonesCrearCarrera.forEach(boton => {
        boton.addEventListener("click", () => {

            const usuario = {
                id: localStorage.getItem("usuarioId"),
                correo: localStorage.getItem("usuarioCorreo"),
                rol: localStorage.getItem("usuarioRol")
            };

            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

            window.location.href = "crearCarreraOrganizador.html";
        });
    });
});



//Boton Salir
document.getElementById("btnSalir").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear(); 
    window.location.href = "login.html";
});

