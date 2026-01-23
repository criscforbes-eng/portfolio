const URL_API = 'http://localhost:3000/api/usuarios';

export async function loginUsuario(credenciales) {
    try {
        const response = await fetch(`${URL_API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciales)
        });

        return await response.json();

    } catch (error) {
        console.error(`Error al intentar iniciar sesión: ${error}`);
    }
}

export async function obtenerUsuarioById(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`);
        if (!response.ok) throw new Error("Usuario no encontrado");
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        return null;
    }
}

export default { loginUsuario, obtenerUsuarioById };

