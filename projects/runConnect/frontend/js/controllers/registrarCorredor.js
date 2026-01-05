import {Corredor} from '../models/corredor.js';
import { registrarCorredor } from '../services/apiCorredor.js';

//boton para agregar un nuevo corredor
document.getElementById('corredorForm').addEventListener('submit', function(event){
    event.preventDefault();
    registrarCorredorForm();
});

async function registrarCorredorForm() {
    try{
        //capturar los datos del formulario.
        const numeroIdentificacion = document.getElementById('numeroIdentificacion').value;
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        // Validar campos
        if (!validarCamposCorredor(numeroIdentificacion, nombre, fechaNacimiento, telefono, correo, password,passwordConfirm)) 
            return;

        // Crear un objeto corredor
        const corredor = new Corredor({
            nombre,
            correo,
            password,
            telefono,
            cedulaIdentidad: numeroIdentificacion,
            fechaNacimiento,
            carrerasInscritas: []   
        });

        // Llamar al API (la función importada)
        const respuesta = await registrarCorredor(corredor);

        await Swal.fire({
        icon: 'success',
        title: 'Corredor Registrado',
        text: `Corredor ${respuesta.corredor.nombre} registrado con el ID: ${respuesta.corredor._id}`,
        });

        // Guardamos al usuario en localStorage para mantener sesión
        localStorage.setItem("usuarioLogueado", JSON.stringify(respuesta.corredor));
        localStorage.setItem("usuarioRol", "corredor");
        localStorage.setItem("usuarioCorreo", respuesta.corredor.correo);
        localStorage.setItem("usuarioId", respuesta.corredor._id);

        // Redirigir al dashboard
        window.location.href = "/codigoCliente/dashboardMenuCorredor.html";

        //Limpiar el formulario
        limpiarFormularioCorredor(); 

    }catch(error){
        console.error('Error al registrar Corredor:', error);
    }
}

// Validación completa de campos Corredor
function validarCamposCorredor(numeroIdentificacion, nombre, fechaNacimiento, telefono, correo, password,passwordConfirm) {
    if (!numeroIdentificacion || !nombre || !fechaNacimiento || !telefono || !correo || !password || !passwordConfirm) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor complete todos los campos obligatorios correctamente."
        });
        return false;
    }
    return true;
}


// Limpiar formulario Corredor
function limpiarFormularioCorredor(){
    document.getElementById('numeroIdentificacion').value= '';
    document.getElementById('nombre').value= '';
    document.getElementById('fechaNacimiento').value= '';
    document.getElementById('telefono').value= '';
    document.getElementById('email').value= '';
    document.getElementById('password').value= '';
    document.getElementById('passwordConfirm').value= '';
}
