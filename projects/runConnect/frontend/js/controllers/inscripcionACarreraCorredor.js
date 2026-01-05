// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    console.log("Correo:", localStorage.getItem("usuarioCorreo"));
    console.log("Rol:", localStorage.getItem("usuarioRol"));
    console.log("UsuarioId:", localStorage.getItem("usuarioId"));
    console.log("CorredorId:", localStorage.getItem("corredorId"));
});

// Obtener carrera desde localStorage 
const carreraLS = localStorage.getItem("carreraSeleccionada");

if (!carreraLS) {
    alert("No se ha seleccionado ninguna carrera.");
    window.location.href = "carrerasCorredor.html";
}

let carrera = JSON.parse(carreraLS);

// Normalizar para que tenga _id
if (!carrera._id && carrera.id) {
    carrera._id = carrera.id;
    localStorage.setItem("carreraSeleccionada", JSON.stringify(carrera));
}

// Cargar datos de la carrera en el HTML
function cargarDatosCarrera() {
    try {
        document.querySelector(".sct2Card1 h3").textContent = carrera.nombre;

        const fechaObj = new Date(carrera.fechaHoraInicio);
        document.querySelector(".sct2Card1 .row:nth-child(3) .col-md-6:nth-child(1) p").textContent =
            fechaObj.toLocaleDateString("es-CR");
        document.querySelector(".sct2Card1 .row:nth-child(3) .col-md-6:nth-child(2) p").textContent =
            fechaObj.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });

        document.querySelector(".sct2Card1 .row:nth-child(4) .col-md-6:nth-child(1) p").textContent = carrera.lugar;
        document.querySelector(".sct2Card1 .row:nth-child(4) .col-md-6:nth-child(2) p").textContent =
            typeof carrera.organizador === "object" ? carrera.organizador.nombre : carrera.organizador;

        document.querySelector(".inscripcion p:nth-child(2)").textContent = carrera.precio;
        document.querySelector(".total p:nth-child(2)").textContent = carrera.precio;

        document.querySelector(".sct3Card1 p").textContent = `El monto debe ser exactamente ${carrera.precio}`;
        const inputMonto = document.querySelector(".sct3Card1 input");
        inputMonto.placeholder = carrera.precio;
        inputMonto.dataset.montoCorrecto = carrera.precio;

    } catch (err) {
        console.error("Error cargando datos de carrera:", err);
    }
}

cargarDatosCarrera();

// Botón enviar: validar pago y guardar datos
document.getElementById("btnEnviar").addEventListener("click", function (e) {
    const inputMonto = document.querySelector(".sct3Card1 input");
    const montoCorrecto = Number(inputMonto.dataset.montoCorrecto);
    const montoIngresado = Number(inputMonto.value);

    if (montoIngresado !== montoCorrecto) {
        e.preventDefault();
        alert(`Debe ingresar exactamente ${montoCorrecto} para continuar.`);
        return;
    }

    // Guardar datos del corredor
    const datosCorredor = {
        _id: localStorage.getItem("corredorId"),
        correo: localStorage.getItem("usuarioCorreo"),
        rol: localStorage.getItem("usuarioRol")
    };
    localStorage.setItem("datosCorredor", JSON.stringify(datosCorredor));

    // Guardar datos del pago
    const datosPago = {
        monto: montoIngresado
    };
    localStorage.setItem("datosPago", JSON.stringify(datosPago));

    // Redirigir a confirmar inscripción
    window.location.href = "confirmarInscripcionCorredor.html";
});
