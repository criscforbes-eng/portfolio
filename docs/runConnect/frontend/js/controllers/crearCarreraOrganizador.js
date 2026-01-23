import { Carrera } from '../models/carrera.js';
import { registrarCarrera } from '../services/apiCarrera.js';

// Mostrar info del organizador en consola
console.log("Correo guardado:", localStorage.getItem("usuarioCorreo"));
console.log("Rol:", localStorage.getItem("usuarioRol"));
console.log("UsuarioId:", localStorage.getItem("usuarioId"));
console.log("OrganizadorId:", localStorage.getItem("organizadorId")); // 🔹 nuevo

// PREVIEW DE IMAGEN
const imagenInput = document.getElementById("imagen");
const previewImg = document.createElement("img");
previewImg.style.maxWidth = "200px";
previewImg.style.marginTop = "10px";
imagenInput.insertAdjacentElement("afterend", previewImg);

imagenInput.addEventListener("change", () => {
    const file = imagenInput.files[0];
    previewImg.src = file ? URL.createObjectURL(file) : "";
});

// Esperar al DOM
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('crearCarreraForm');

    // Usamos directamente organizadorId del localStorage
    const organizadorId = localStorage.getItem("organizadorId");
    if (!organizadorId) {
        console.error("No se encontró organizadorId en localStorage");
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró información del organizador. Por favor inicia sesión nuevamente.',
        });
        return;
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const fechaHoraInicioRaw = document.getElementById('fechaHoraInicio').value;
        const fechaHoraInicio = new Date(fechaHoraInicioRaw);
        const lugar = document.getElementById('lugar').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);
        const maxInscripciones = parseInt(document.getElementById('maxInscripciones').value);
        const imagenFile = imagenInput.files[0];
        const imagen = imagenFile ? URL.createObjectURL(imagenFile) : null;

        if (!validarCamposCarrera(nombre, fechaHoraInicioRaw, lugar, precio, maxInscripciones)) return;

        const carrera = new Carrera({
            nombre,
            fechaHoraInicio,
            lugar,
            precio,
            cuposDisponibles: maxInscripciones,
            imagen,
            organizador: organizadorId // 🔹 usamos directamente
        });

        console.log("INFO carrera a registrar:", carrera);

        try {
            // Registrar carrera
            const respuesta = await registrarCarrera(carrera);
            const carreraId = respuesta.carrera?._id || respuesta._id || respuesta.id;

            if (!carreraId) throw new Error("No se pudo obtener el ID de la carrera del backend.");
            console.log("Carrera creada con ID:", carreraId);

            // Asociar la carrera al organizador usando organizadorId directo
            const asociacionRespuesta = await fetch(
                `http://localhost:3000/api/organizadores/${organizadorId}/carreras`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ _id: carreraId }) // backend espera '_id'
                }
            );

            if (!asociacionRespuesta.ok) {
                const errorText = await asociacionRespuesta.text();
                throw new Error(`Error asociando carrera: ${errorText}`);
            }

            Swal.fire({
            icon: 'success',
            title: 'Carrera creada',
            text: `La carrera "${nombre}" ha sido registrada exitosamente.`,
            }).then(() => {
                limpiarFormularioCarrera();

                // 🔹 Redirigir al dashboard del organizador después de crear la carrera
                window.location.href = "dashboardMenuOrganizador.html";
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo registrar la carrera o asociarla. Intente nuevamente.',
            });
            console.error("Error al registrar o asociar carrera:", error);
        }
    });
});

// VALIDACIÓN
function validarCamposCarrera(nombre, fechaHoraInicio, lugar, precio, maxInscripciones) {
    if (!nombre || !fechaHoraInicio || !lugar || !precio || !maxInscripciones) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor complete todos los campos obligatorios correctamente.',
        });
        return false;
    }
    return true;
}

// LIMPIAR FORMULARIO
function limpiarFormularioCarrera() {
    document.getElementById('crearCarreraForm').reset();
    imagenInput.value = "";
    previewImg.src = "";
}
