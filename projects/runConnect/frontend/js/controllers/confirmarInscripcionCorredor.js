import { crearInscripcion } from "../services/apiInscripcion.js";

document.addEventListener("DOMContentLoaded", async () => {

    // 1. Obtener datos de localStorage
    const carrera = JSON.parse(localStorage.getItem("carreraSeleccionada"));
    const corredor = JSON.parse(localStorage.getItem("datosCorredor"));
    const pago = JSON.parse(localStorage.getItem("datosPago"));

    if (!carrera || !corredor || !pago) {
        alert("Faltan datos para confirmar la inscripción. Redirigiendo a selección de carreras.");
        window.location.href = "carrerasCorredor.html";
        return;
    }

    // 2. Generar número de corredor
    const numeroCorredor = Math.floor(1000 + Math.random() * 9000);

    // 3. Insertar datos en el HTML
    document.getElementById("numeroCorredor").textContent = `#${numeroCorredor}`;
    document.getElementById("numeroCorredor2").textContent = `#${numeroCorredor}`;
    document.getElementById("resumenNombre").textContent = carrera.nombre;

    const fechaObj = new Date(carrera.fechaHoraInicio);
    document.getElementById("resumenFecha").textContent = fechaObj.toLocaleDateString("es-CR");
    document.getElementById("resumenHora").textContent = fechaObj.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });
    document.getElementById("resumenUbicacion").textContent = carrera.lugar;
    document.getElementById("resumenOrganizador").textContent =
        typeof carrera.organizador === "object" ? carrera.organizador.nombre : carrera.organizador;

    // 4. Preparar datos para la API
    const inscripcionData = {
        corredorId: corredor._id,
        carreraId: carrera._id,
        montoPagado: pago.monto,
        numeroCorredor
    };

    console.log("Datos de inscripción enviados a la API:", inscripcionData);

    // 5. Crear inscripción en la API
    let nuevaInscripcion;
    try {
        nuevaInscripcion = await crearInscripcion(inscripcionData);
        console.log("Inscripción creada:", nuevaInscripcion);
    } catch (error) {
        console.error("Error al crear la inscripción:", error);
        alert("No se pudo crear la inscripción. Intente nuevamente.");
        return;
    }

    // 6. Botón imprimir comprobante
    document.getElementById("btnImprimir").addEventListener("click", () => {
        window.print();
    });

});
