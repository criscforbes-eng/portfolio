//console.log("ControllerUsuarios CARGADO");

import Usuario from "../models/usuario.js";

// GET http://localhost:3000/api/usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const lista = await Usuario.find();
        return res.status(200).send(lista);

    } catch (error) {
        console.log(`Error al listar usuarios: ${error}`);
        return res.status(400).send(error);
    }
};

// GET http://localhost:3000/api/usuarios/:id
export const obtenerUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioEncontrado = await Usuario.findById(id);

        if (!usuarioEncontrado)
            return res.status(404).send({ message: "Usuario no encontrado" });

        return res.status(200).send(usuarioEncontrado);

    } catch (error) {
        console.log("Error al obtener usuario:", error);
        return res.status(400).send(error);
    }
};

// POST http://localhost:3000/api/usuarios
export const guardarUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        return res.status(201).send(nuevoUsuario);

    } catch (error) {
        console.log(`Error al agregar un nuevo usuario: ${error}`);
        return res.status(500).send(error);
    }
};

// POST http://localhost:3000/api/usuarios/login
export const loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).send({ message: "Correo y contraseña son obligatorios" });
        }

        // 1. Buscar usuario por correo
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        // 2. Validar password
        if (usuario.password !== password) {
            return res.status(401).send({ message: "Contraseña incorrecta" });
        }

        // 3. Respuesta
        res.status(200).send({
            message: "Login exitoso",
            usuario
        });

    } catch (error) {
        console.log("Error en login:", error);
        res.status(500).send(error);
    }
};


// PUT http://localhost:3000/api/usuarios/:id
export const modificarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioModificado = await Usuario.findOneAndUpdate(
            { _id: id },
            req.body
        );

        return res.status(200).send(usuarioModificado);

    } catch (error) {
        console.log(`Error al modificar un usuario: ${error}`);
        return res.status(400).send(error);
    }
};

// DELETE http://localhost:3000/api/usuarios/:id
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Usuario.findOneAndDelete({ _id: id });
        return res.status(200).send(data);

    } catch (error) {
        console.log(`Error al eliminar un usuario: ${error}`);
        return res.status(400).send(error);
    }
};

export default {
    obtenerUsuarios,
    obtenerUsuarioById,
    guardarUsuario,
    loginUsuario,
    modificarUsuario,
    eliminarUsuario
};
