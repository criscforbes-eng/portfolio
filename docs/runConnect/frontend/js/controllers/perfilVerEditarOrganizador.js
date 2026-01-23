import apiOrganizador from '../services/apiOrganizador.js';

document.addEventListener("DOMContentLoaded", async () => {

    const organizadorId = localStorage.getItem("organizadorId");

    if (!organizadorId) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró información del organizador. Por favor inicia sesión nuevamente.'
        });
        return;
    }

    try {
        const organizador = await apiOrganizador.obtenerOrganizadorById(organizadorId);

        if (!organizador) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar la información del organizador.'
            });
            return;
        }

        console.log("Datos del organizador cargados:", organizador);

        // CARGAR DATOS EN EL FORMULARIO
        document.getElementById('cedulaJuridica').value = organizador.cedulaJuridica || '';
        document.getElementById('nombre').value = organizador.nombre || '';  // <--- ESTA LÍNEA ES CLAVE
        document.getElementById('direccion').value = organizador.direccion || '';
        document.getElementById('telefono').value = organizador.telefono || '';
        document.getElementById('email').value = organizador.correo || '';
        document.getElementById('password').value = '';
        document.getElementById('passwordConfirm').value = '';

    } catch (error) {
        console.error("Error cargando datos del organizador:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un problema cargando la información del organizador.'
        });
    }


    // BOTÓN GUARDAR CAMBIOS
    const btnGuardar = document.querySelector(".boton2Sect1");

    btnGuardar.addEventListener("click", async () => {

        const cedulaJuridica = document.getElementById('cedulaJuridica').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const correo = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        if (!cedulaJuridica || !nombre || !direccion || !telefono || !correo) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos obligatorios.'
            });
            return;
        }

        if (password || passwordConfirm) {
            if (password !== passwordConfirm) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Contraseña no coincide',
                    text: 'La contraseña y su confirmación deben coincidir.'
                });
                return;
            }
        }

        const organizadorActualizado = {
            cedulaJuridica,
            nombre,
            direccion,
            telefono,
            correo
        };

        if (password) {
            organizadorActualizado.password = password;
        }

        try {
            const respuesta = await apiOrganizador.actualizarOrganizador(organizadorId, organizadorActualizado);

            if (respuesta && respuesta._id) {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos actualizados',
                    text: 'La información del organizador se ha actualizado correctamente.'
                });
            } else {
                throw new Error("No se pudo actualizar el organizador");
            }

        } catch (error) {
            console.error("Error actualizando organizador:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un problema al actualizar la información.'
            });
        }

    });


    // BOTÓN REGRESAR
    document.querySelector(".boton1Sect1").addEventListener("click", () => {
        window.location.href = "dashboardMenuOrganizador.html";
    });

});
