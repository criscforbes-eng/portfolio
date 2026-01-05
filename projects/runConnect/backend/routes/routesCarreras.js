//console.log("RoutesCarreras CARGADO");

import express from 'express';
import carreraControler from '../controllers/controllerCarreras.js'

const router = express.Router();

// Requests http
router.get('/', carreraControler.obtenerCarreras);
router.get('/buscar/:palabra', carreraControler.getCarrerasByFiltro);
router.get('/buscarEstado/:estado', carreraControler.getCarrerasByEstado);
router.get('/:id', carreraControler.obtenerCarreraById);
router.post('/', carreraControler.guardarCarrera);
router.put('/:id', carreraControler.modificarCarrera);
router.delete('/:id', carreraControler.eliminarCarrera);

router.post('/:id/corredoresInscritos', carreraControler.agregarInscripcionCarrera);

router.delete('/:id/corredoresInscritos/:idInscripcion', carreraControler.eliminarInscripcionCarrera);

export default router;
