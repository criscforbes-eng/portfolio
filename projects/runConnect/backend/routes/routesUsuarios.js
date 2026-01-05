import express from 'express';
import usuarioController from '../controllers/controllerUsuarios.js';

const router = express.Router();

// LOGIN
router.post("/login", usuarioController.loginUsuario);

// EVITAR cast error cuando llega GET /login
router.get("/login", (req, res) => {
    res.status(405).send({ message: "Método GET no permitido" });
});

// Rutas normales
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioById);
router.post('/', usuarioController.guardarUsuario);
router.put('/:id', usuarioController.modificarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

export default router;

