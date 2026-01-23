const URL_API = 'http://localhost:3000/api/corredores';

export async function registrarCorredor(corredor) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corredor)
        };

        const response = await fetch(URL_API, options);
        return await response.json();

    } catch (error) {
        console.error(`Error al registrar un corredor: ${error}`);
    }
}

// Obtener corredor por su _id real de corredor
export async function obtenerCorredorById(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al obtener corredor por ID: ${error}`);
    }
}

// Obtener corredor usando usuarioId (NO corredorId)
// función para obtener corredor por usuarioId
export async function obtenerCorredorByUsuarioId(usuarioId){
    try {
        const response = await fetch(`${URL_API}/by-usuario/${usuarioId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al obtener corredor por usuarioId: ${error}`);
    }
}

// Actualizar corredor por su _id
export async function actualizarCorredor(corredorId, datosActualizados) {
    try {
        const response = await fetch(`${URL_API}/${corredorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();

    } catch (error) {
        console.error(`Error al actualizar corredor: ${error}`);
    }
}

export default {
    registrarCorredor,
    obtenerCorredorById,
    obtenerCorredorByUsuarioId,
    actualizarCorredor
}

