//console.log("RoutesInscripciones CARGADO");

import express from 'express';
import inscripcionControler from '../controllers/controllerInscripciones.js'

const router = express.Router();

// Requests http
router.get('/',inscripcionControler.obtenerInscripciones);
router.get('/:id',inscripcionControler.obtenerInscripcionById);
router.post('/',inscripcionControler.guardarInscripcion);
router.put('/:id',inscripcionControler.modificarInscripcion);
router.delete('/:id',inscripcionControler.eliminarInscripcion);

export default router;