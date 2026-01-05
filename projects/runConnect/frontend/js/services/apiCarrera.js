import { Carrera } from "../models/carrera.js";
const URL_API = "http://localhost:3000/api/carreras";

// Registrar carrera
export async function registrarCarrera(carrera) {
    try {
        const carreraBackend = {
            nombre: carrera.nombre,
            fechaHoraInicio: new Date(carrera.fechaHoraInicio),
            lugar: carrera.lugar,
            cuposDisponibles: carrera.cuposDisponibles,
            precio: carrera.precio,
            imagen: carrera.imagen,
            organizador: carrera.organizador
        };

        const response = await fetch(URL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carreraBackend)
        });

        const data = await response.json();
        const carreraData = data.carrera ?? data;

        carreraData.id = carreraData._id;

        return new Carrera(carreraData);

    } catch (error) {
        console.error("Error al registrar carrera:", error);
        throw error;
    }
}

// Listar todas las carreras
export async function listarCarreras() {
    try {
        const response = await fetch(URL_API);
        const data = await response.json();
        return data.map(c => new Carrera(c));
    } catch (error) {
        console.error("Error al listar carreras:", error);
        return [];
    }
}

// Obtener carrera por ID
export async function obtenerCarreraById(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`);

        if (!response.ok) throw new Error("No existe la carrera");

        const data = await response.json();
        return new Carrera(data);

    } catch (error) {
        console.error("Error al obtener carrera por ID:", error);
        return null;
    }
}

// Buscar por palabra
export async function obtenerCarreraByWord(palabra) {
    try {
        const response = await fetch(`${URL_API}/buscar/${palabra}`);

        if (!response.ok) throw new Error("Error al buscar carreras por palabra");

        const data = await response.json();
        return data.map(c => new Carrera(c));

    } catch (error) {
        console.error("Error en obtenerCarreraByWord:", error);
        return [];
    }
}

// Buscar por estado
export async function obtenerCarrerasByEstado(estado) {
    try {
        const response = await fetch(`${URL_API}/buscarEstado/${estado}`);

        if (!response.ok) throw new Error("Error al buscar por estado");

        const data = await response.json();
        return data.map(c => new Carrera(c));

    } catch (error) {
        console.error("Error en obtenerCarrerasByEstado:", error);
        return [];
    }
}

// Exportación correcta
export default {
    registrarCarrera,
    listarCarreras,
    obtenerCarreraById,
    obtenerCarreraByWord,
    obtenerCarrerasByEstado
};
