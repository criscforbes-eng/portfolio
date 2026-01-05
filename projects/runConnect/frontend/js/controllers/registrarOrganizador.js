import {Organizador} from '../models/organizador.js';
import { registrarOrganizador } from '../services/apiOrganizador.js';

//declarar la lista de carreras creadas por organizador
const carrerasOrganizadas = [];

document.getElementById('organizadorForm').addEventListener('submit', function(event){

    //puede cancelar la accion prdeterminada de un evento, en este caso el submit del formulario
    event.preventDefault();
    registrarOrganizadorForm();
});

async function registrarOrganizadorForm() {
    try{
    //capturar los datos del formulario.
    const cedulaJuridica = document.getElementById('cedulaJuridica').value;
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    // Validar campos
    if (!validarCamposOrganizador(cedulaJuridica, nombre, direccion, telefono, correo, password,passwordConfirm)) return;

   // crear el objeto usando la clase
    const organizador = new Organizador({
        nombre,
        correo,
        password,
        telefono,
        cedulaJuridica,
        direccion,
        carrerasOrganizadas: [] 
    });

    // Llamar al API (la función importada)
    const respuesta = await registrarOrganizador(organizador);

    await Swal.fire({
    icon: 'success',
    title: 'Organizador Registrado',
    text: `Corredor ${respuesta.organizador.nombre} registrado con el ID: ${respuesta.organizador._id}`,
    });

    console.log('Valor de respuesta:', respuesta);
    console.log('Valor de respuesta.organizador:', respuesta.organizador);

    // Guardamos al usuario en localStorage para mantener sesión
    localStorage.setItem("usuarioLogueado", JSON.stringify(respuesta.organizador));
    localStorage.setItem("usuarioRol", "organizador");
    localStorage.setItem("usuarioCorreo", respuesta.usuario.correo);
    localStorage.setItem("usuarioId", respuesta.usuario._id);
    localStorage.setItem("organizadorId", respuesta.organizador._id);

    // Redirigir al dashboard
    window.location.href = "/codigoCliente/dashboardMenuOrganizador.html";

    //Limpiar el formulario
    limpiarFormularioOrganizador (); 

    }catch(error){
        console.error('Error al registrar Organizador:', error);
    }
}

// Validación completa de campos Organizador
function validarCamposOrganizador(cedulaJuridica, nombre, direccion, telefono, correo, password, passwordConfirm) {
    if (!cedulaJuridica || !nombre || !direccion || !telefono || !correo || !password || !passwordConfirm) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor complete todos los campos obligatorios correctamente."
        });
        return false;
    }
    return true;
}


// Limpiar formulario Organizador
function limpiarFormularioOrganizador(){
    document.getElementById('cedulaJuridica').value= '';
    document.getElementById('nombre').value= '';
    document.getElementById('direccion').value= '';
    document.getElementById('telefono').value= '';
    document.getElementById('email').value= '';
    document.getElementById('password').value= '';
    document.getElementById('passwordConfirm').value= '';
}