//console.log("RoutesCorredores CARGADO");

import express from 'express';
import corredorControler from '../controllers/controllerCorredores.js'

const router = express.Router();

// Requests http
router.get('/', corredorControler.obtenerCorredores);
router.get('/by-usuario/:usuarioId', corredorControler.obtenerCorredorByUsuarioId);
router.get('/:id', corredorControler.obtenerCorredorById);
router.post('/', corredorControler.guardarCorredor);
router.put('/:id', corredorControler.modificarCorredor);
router.delete('/:id', corredorControler.eliminarCorredor);

//http://localhost:3000/api/corredores/:idcorredor/carrerasInscritas
//agregar a un corredor una inscripcion
router.post('/:id/carrerasInscritas', corredorControler.agregarInscripcionCorredor);

//eliminar una inscripcion a un corredor
router.delete('/:id/carrerasInscritas/:idInscripcion', corredorControler.eliminarInscripcionCorredor);

export default router;