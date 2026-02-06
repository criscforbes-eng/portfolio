// IMPORTAR API PARA LOGIN
import { loginUsuario } from "../services/apiUsuario.js";
import apiOrganizador from "../services/apiOrganizador.js"; 
import apiCorredor from "../services/apiCorredor.js";

// SELECCIÓN DE TIPO DE USUARIO 
let tipoUsuarioSeleccionado = null;

const burbujas = document.querySelectorAll(".burbuja1");
const loginForm = document.getElementById("loginForm");
const labelEmail = document.querySelector('label[for="email"]');

// Agregar interacción a las burbujas
burbujas.forEach(burbuja => {
    burbuja.addEventListener("click", () => {
        burbujas.forEach(b => b.classList.remove("activo")); // quitar activo de todas
        burbuja.classList.add("activo"); // marcar la burbuja clickeada

        tipoUsuarioSeleccionado = burbuja.textContent.trim().toLowerCase(); // asignar rol

        if (tipoUsuarioSeleccionado === "corredor") {
            labelEmail.textContent = "Correo electrónico del Corredor:";
        } else {
            labelEmail.textContent = "Correo electrónico de la Empresa:";
        }
    });
});


// MANEJO DEL FORMULARIO CON SWEETALERT 
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!tipoUsuarioSeleccionado) {
        Swal.fire({
            icon: "warning",
            title: "Selecciona un tipo de usuario",
            text: "Debes elegir Corredor o Empresa antes de iniciar sesión."
        });
        return;
    }

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor completa todos los campos para continuar."
        });
        return;
    }

    const credenciales = {
        correo: email,
        password,
        rol: tipoUsuarioSeleccionado
    };

    try {
        const respuesta = await loginUsuario(credenciales);

        if (!respuesta || !respuesta.usuario) {
            Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                text: "Correo o contraseña no válidos."
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Login exitoso",
            text: `Bienvenido ${respuesta.usuario.correo}`,
            timer: 1800,
            showConfirmButton: false
        }).then(async () => {
            console.log("Respuesta login backend:", respuesta);

            // Guardar datos básicos del usuario
            localStorage.setItem("usuarioId", respuesta.usuario._id);
            localStorage.setItem("usuarioCorreo", respuesta.usuario.correo);
            localStorage.setItem("usuarioRol", respuesta.usuario.rol);

            if (tipoUsuarioSeleccionado === "corredor") {
            // Para corredores, obtener corredor real y guardar su _id
            try {
                const corredor = await apiCorredor.obtenerCorredorByUsuarioId(respuesta.usuario._id);
                if (corredor && corredor._id) {
                    localStorage.setItem("corredorId", corredor._id); // 🔹 guardar corredorId
                } else {
                    console.warn("No se encontró corredor asociado al usuario.");
                }
            } catch (error) {
                console.error("Error obteniendo corredor:", error);
            }

            // Redirigir a dashboard corredor
            window.location.href = "dashboardMenuCorredor.html";
            
            } else {
                // Para organizadores, obtener organizador real y guardar su _id
                try {
                    const organizador = await apiOrganizador.obtenerOrganizadorByUsuarioId(respuesta.usuario._id);
                    if (organizador && organizador._id) {
                        localStorage.setItem("organizadorId", organizador._id);
                    } else {
                        console.warn("No se encontró organizador asociado al usuario.");
                    }
                } catch (error) {
                    console.error("Error obteniendo organizador:", error);
                }

                // Redirigir a dashboard organizador
                window.location.href = "dashboardMenuOrganizador.html";
            }

            console.log("Login como:", tipoUsuarioSeleccionado);
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error en el servidor",
            text: "No se pudo conectar con el servidor."
        });
        console.error("Error al iniciar sesión:", error);
    }
});

// BOTÓN "REGISTRATE AQUI" SEGÚN TIPO DE USUARIO 
const btnToRegistrar = document.getElementById("btnToRegistrar");

btnToRegistrar.addEventListener("click", () => {
    if (!tipoUsuarioSeleccionado) {
        Swal.fire({
            icon: "warning",
            title: "Selecciona un tipo de usuario",
            text: "Elige Corredor o Empresa antes de registrarte."
        });
        return;
    }

    if (tipoUsuarioSeleccionado === "corredor") {
        window.location.href = "registroCorredor.html";
    } else {
        window.location.href = "registroOrganizador.html";
    }
});
