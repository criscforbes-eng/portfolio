// services/apiInscripcion.js
const URL_API = "http://localhost:3000/api/inscripciones";

// Registrar una inscripción
export async function crearInscripcion(data) {
    try {
        const response = await fetch("http://localhost:3000/api/inscripciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Respuesta del servidor:", errorText);
            throw new Error("Error al crear la inscripción");
        }

        return await response.json();

    } catch (error) {
        console.error("Error en crearInscripcion:", error);
        throw error;
    }
}


// Obtener inscripción por ID
export const obtenerInscripcionById = async (id) => {
    try {
        const response = await fetch(`${URL_API}/${id}`);
        if (!response.ok) throw new Error("Error al obtener inscripción");

        return await response.json();
    } catch (error) {
        console.error("Error en obtenerInscripcionById:", error);
        return null;
    }
};

// Listar inscripciones del corredor
export const obtenerInscripcionesCorredor = async (idCorredor) => {
    try {
        const response = await fetch(`${URL_API}/corredor/${idCorredor}`);
        if (!response.ok) throw new Error("Error al obtener inscripciones del corredor");

        return await response.json();
    } catch (error) {
        console.error("Error en obtenerInscripcionesCorredor:", error);
        return null;
    }
};
