//console.log("ControllerCarreras CARGADO");

import carrera from '../models/carrera.js';
import Inscripcion from "../models/inscripcion.js";


//Get http://localhost:3000/api/carreras
export const obtenerCarreras = async (req, res) => {
    try {
        const lista = await carrera.find().populate("inscripciones");
        return res.status(200).send(lista);

    } catch (error) {
        console.log(`Error al listar carreras: ${error}`);
        return res.status(400).send(error);
    }
};

// GET http://localhost:3000/api/carreras/buscar/:palabra
export const getCarrerasByFiltro = async (req, res) => {
    try {
        const { palabra } = req.params;

        const lista = await carrera
            .find({ nombre: { $regex: palabra, $options: "i" } })
            .populate("inscripciones");

        return res.status(200).send(lista);

    } catch (error) {
        console.log(`Error al buscar carreras: ${error}`);
        return res.status(400).send(error);
    }
};

// GET http://localhost:3000/api/carreras/buscarEstado/:estado
export const getCarrerasByEstado = async (req, res) => {   
    try {
        const { estado } = req.params;

        const lista = await carrera
            .find({ estado: { $in: [estado] } })
            .populate("inscripciones")
            .collation({ locale: "es", strength: 1 });

        return res.status(200).send(lista);

    } catch (error) {
        console.log(`Error al listar carreras: ${error}`);
        return res.status(400).send(error);
    }
};

//Get by Id http://localhost:3000/api/carreras/:id
export const obtenerCarreraById = async (req, res) => {
    try {
        const { id } = req.params;

        const carreraEncontrada = await carrera.findById(id).populate("inscripciones");
        return res.status(200).send(carreraEncontrada);

    } catch (error) {
        console.log(`Error al obtener carrera: ${error}`);
        return res.status(400).send(error);
    }
};

//Post http://localhost:3000/api/carreras
export const guardarCarrera = async (req,res)=>{
    try{
     
      const nuevaCarrera = await carrera.create(req.body);
      return res.status(201).json({ carrera: nuevaCarrera });    

    }catch(error){
        console.log(`Error al agregar una carrera: ${error}`);
      res.status(500).send(error);
  }
}

// POST http://localhost:3000/api/carreras/:id/corredoresInscritos
export const agregarInscripcionCarrera = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar si la carrera existe
        const carreraEncontrada = await carrera.findById(id);
        if (!carreraEncontrada)
            return res.status(404).json({ error: "Carrera no encontrada" });

        // Validar si la inscripción existe
        const { _id } = req.body;
        const inscripcion = await Inscripcion.findById(_id);

        if (!inscripcion)
            return res.status(404).json({ error: "Inscripción no encontrada" });

        // Validar si pertenece a esta carrera
        if (inscripcion.carreraId.toString() !== id)
            return res.status(400).json({ error: "La inscripción no pertenece a esta carrera" });

        // Si ya está inscrito, evitar duplicados
        if (!carreraEncontrada.inscripciones.includes(_id)) {
            carreraEncontrada.inscripciones.push(_id);
        }

        // Guardar cambios en BD
        await carreraEncontrada.save();

        return res.status(200).send({
            message: "Inscripción agregada correctamente",
            carrera: await carrera.findById(id).populate("inscripciones")
        });

    } catch (error) {
        console.log(`Error al asociar una inscripcion a una carrera: ${error}`);
        return res.status(400).send(error);
    }
};

//Put http://localhost:3000/api/carreras/:id
export const modificarCarrera = async (req,res)=>{
    try{    
        const {id} = req.params;
       const carreraModificada = await carrera.findOneAndUpdate({_id:id},req.body);  
       return res.status(200).send(carreraModificada); 

    }catch(error){
      console.log(`Error al modificar una carrera: ${error}`);
        return res.status(400).send(error);
  }
}

//Delete http://localhost:3000/api/carreras/:id
export const eliminarCarrera = async (req,res)=>{
    try{      
        const {id} = req.params;
       const data = await carrera.findOneAndDelete({_id:id});  
       return res.status(200).send(data);

    }catch(error){
      console.log(`Error al eliminar una carrera: ${error}`);
        return res.status(400).send(error);
  }
}

// DELETE http://localhost:3000/api/carreras/:id/corredoresInscritos/:idInscripcion
export const eliminarInscripcionCarrera = async (req, res) => {
    try {
        const { id, idInscripcion } = req.params;

        // Validar carrera
        const carreraEncontrada = await carrera.findById(id);
        if (!carreraEncontrada)
            return res.status(404).json({ error: 'La carrera indicada no existe en el sistema' });

        // Eliminar inscripción directamente desde el modelo inscripciones
        const eliminada = await Inscripcion.findOneAndDelete({
            _id: idInscripcion,
            carreraId: id
        });

        if (!eliminada)
            return res.status(404).json({ error: 'La inscripción no existe o no pertenece a esta carrera' });

        return res.status(200).send({
            message: "Inscripción eliminada correctamente",
            carrera: carreraEncontrada
        });

    } catch (error) {
        console.log(`Error al eliminar una inscripcion a una carrera: ${error}`);
        return res.status(400).send(error);
    }
};


const carreraController = {
    obtenerCarreras,
    getCarrerasByFiltro,
    getCarrerasByEstado,
    obtenerCarreraById,
    guardarCarrera,
    agregarInscripcionCarrera,
    modificarCarrera,
    eliminarCarrera,
    eliminarInscripcionCarrera
};

export default carreraController;