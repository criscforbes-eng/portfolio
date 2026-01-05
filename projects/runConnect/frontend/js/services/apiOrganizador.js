const URL_API = 'http://localhost:3000/api/organizadores';
import { Carrera } from "../models/carrera.js";

// Registrar organizador nuevo
export async function registrarOrganizador(organizador) {
    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(organizador)
        });

        return await response.json();

    } catch (error) {
        console.error(`Error al registrar un organizador: ${error}`);
    }
}

// Obtener organizador por su _id real
export async function obtenerOrganizadorById(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`);
        return await response.json();

    } catch (error) {
        console.error(`Error al obtener organizador por ID: ${error}`);
    }
}

// Obtener organizador usando usuarioId
export async function obtenerOrganizadorByUsuarioId(usuarioId) {
    if (!usuarioId) {
        console.error('Error: usuarioId is undefined or null.');
        return null;
    }

    try {
        const response = await fetch(`${URL_API}/by-usuario/${usuarioId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (Array.isArray(data.carrerasCreadas)) {
            data.carrerasCreadas = data.carrerasCreadas.map(c => new Carrera(c));
        }

        return data;
    } catch (error) {
        console.error(`Error al obtener organizador por usuarioId: ${error}`);
    }
}


// Actualizar organizador por ID
export async function actualizarOrganizador(id, organizadorActualizado) {
    try {
        const response = await fetch(`${URL_API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(organizadorActualizado)
        });

        return await response.json();

    } catch (error) {
        console.error(`Error al actualizar organizador: ${error}`);
    }
}

export default {
    registrarOrganizador,
    obtenerOrganizadorById,
    obtenerOrganizadorByUsuarioId,
    actualizarOrganizador
};
