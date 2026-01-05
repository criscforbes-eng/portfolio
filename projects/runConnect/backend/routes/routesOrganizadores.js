//console.log("RoutesOrganizadores CARGADO");

import express from 'express';
import organizadorControler from '../controllers/controllerOrganizadores.js'

const router = express.Router();

// Requests http
router.get('/', organizadorControler.obtenerOrganizadores);
router.get('/by-usuario/:usuarioId', organizadorControler.obtenerOrganizadorByUsuarioId);
router.get('/:id', organizadorControler.obtenerOrganizadorById);
router.post('/', organizadorControler.guardarOrganizador);
router.put('/:id', organizadorControler.modificarOrganizador);
router.delete('/:id', organizadorControler.eliminarOrganizador);

//http://localhost:3000/api/organizadores/:idOrganizador/carreras
//agregar a un organizador una carrera
router.post('/:id/carreras', organizadorControler.agregarCarreraOrganizador);

//eliminar una carrera a un organizador
router.delete('/:id/carreras', organizadorControler.eliminarCarreraOrganizador);

export default router;