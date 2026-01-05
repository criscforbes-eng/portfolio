import apiCorredor from '../services/apiCorredor.js';

document.addEventListener("DOMContentLoaded", async () => {

    const corredorId = localStorage.getItem("corredorId");
    if (!corredorId) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró información del corredor. Por favor inicia sesión nuevamente.'
        });
        return;
    }

    try {
        // Obtener datos completos del corredor
        const corredor = await apiCorredor.obtenerCorredorById(corredorId);

        if (!corredor) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar la información del corredor.'
            });
            return;
        }

        console.log("Datos del corredor cargados:", corredor);

        // Rellenar campos del formulario
        document.getElementById('numeroIdentificacion').value = corredor.cedulaIdentidad || '';
        document.getElementById('nombre').value = corredor.nombre || '';
        document.getElementById('fechaNacimiento').value = corredor.fechaNacimiento ? corredor.fechaNacimiento.split('T')[0] : '';
        document.getElementById('telefono').value = corredor.telefono || '';
        document.getElementById('email').value = corredor.correo || '';
        document.getElementById('password').value = '';
        document.getElementById('passwordConfirm').value = '';

    } catch (error) {
        console.error("Error cargando datos del corredor:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un problema cargando la información del corredor.'
        });
    }

    // ---- BOTÓN GUARDAR CAMBIOS ----
    const btnGuardar = document.querySelector(".boton2Sect1");
    btnGuardar.addEventListener("click", async () => {

        // Obtener valores del formulario
        const numeroIdentificacion = document.getElementById('numeroIdentificacion').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const telefono = document.getElementById('telefono').value.trim();
        const correo = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        // Construir objeto actualizado
        const corredorActualizado = {
            cedulaIdentidad: numeroIdentificacion,
            nombre,
            fechaNacimiento,
            telefono,
            correo
        };

        // Solo actualizar la contraseña si el usuario escribió algo
        if (password) {
            corredorActualizado.password = password;
        }

        console.log("Datos que se enviarán a la API:", corredorActualizado);

        // Validaciones básicas
        if (!numeroIdentificacion || !nombre || !fechaNacimiento || !telefono || !correo) {
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

        try {
            // Llamar a la API para actualizar
            const respuesta = await apiCorredor.actualizarCorredor(corredorId, corredorActualizado);

            if (respuesta && respuesta._id) {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos actualizados',
                    text: 'Tu perfil se ha actualizado correctamente.'
                });
            } else {
                throw new Error("No se pudo actualizar el corredor");
            }

        } catch (error) {
            console.error("Error actualizando corredor:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un problema al actualizar tu perfil.'
            });
        }
    });

    // ---- BOTÓN REGRESAR ----
    const btnRegresar = document.querySelector(".boton1Sect1");

    if (btnRegresar) {
        btnRegresar.addEventListener("click", () => {
            window.location.href = "/codigoCliente/dashboardMenuCorredor.html";
        });
    }

});
