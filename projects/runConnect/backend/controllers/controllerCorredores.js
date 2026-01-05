//console.log("ControllerCorredores CARGADO");
import Usuario from "../models/usuario.js";
import corredor from '../models/corredor.js';
import Inscripcion from "../models/inscripcion.js";

//Get http://localhost:3000/api/corredores
export const obtenerCorredores = async (req,res)=>{
    try{
       
        const lista = await corredor.find();
        return res.status(200).send(lista);

  }catch(error){
      console.log(`Error al listar corredores: ${error}`);
      return res.status(400).send(error);
  }
};

//Get http://localhost:3000/api/corredores/:id
export const obtenerCorredorById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar corredor por ID
        const corredorEncontrado = await corredor.findById(id)
            .populate("carrerasInscritas"); 

        if (!corredorEncontrado) {
            return res.status(404).json({ message: "Corredor no encontrado" });
        }

        return res.status(200).json(corredorEncontrado);

    } catch (error) {
        console.log(`Error al obtener corredor por id: ${error}`);
        return res.status(500).send(error);
    }
};

//GET http://localhost:3000/api/corredores/by-usuario/:usuarioId
export const obtenerCorredorByUsuarioId = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const corredorEncontrado = await corredor.findOne({ usuarioId })
            .populate("carrerasInscritas");

        if (!corredorEncontrado) {
            return res.status(404).json({ message: "Corredor no encontrado por usuarioId" });
        }

        return res.status(200).json(corredorEncontrado);

    } catch (error) {
        console.log("Error al obtener corredor por usuarioId:", error);
        return res.status(500).send(error);
    }
};

//Post http://localhost:3000/api/corredores
export const guardarCorredor = async (req,res)=>{
    try{
        // 1. Crear usuario primero
        const nuevoUsuario = await Usuario.create({
            correo: req.body.correo,
            password: req.body.password,
            rol: "corredor"
        });

        // 2. Crear corredor enlazado al usuario
        const nuevoCorredor = await corredor.create({
            ...req.body,
            usuarioId: nuevoUsuario._id
        });

        return res.status(201).send({
            message: "Corredor registrado correctamente",
            usuario: nuevoUsuario,
            corredor: nuevoCorredor
        });

    }catch(error){
        console.log(`Error al agregar un nuevo corredor: ${error}`);
        res.status(500).send(error);
    }
};

// POST http://localhost:3000/api/corredores/:id/carrerasInscritas
export const agregarInscripcionCorredor = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar si el corredor existe
        const corredorEncontrado = await corredor.findById(id);
        if (!corredorEncontrado) {
            return res.status(404).json({ error: "Corredor no encontrado" });
        }

        // Registrar inscripción
        const { carreraId, montoPagado } = req.body;

        // Asegurar que el arreglo exista
        if (!corredorEncontrado.carrerasInscritas) {
            corredorEncontrado.carrerasInscritas = [];
        }

        // Verificar si ya está inscrito
        const existeInscripcion = corredorEncontrado.carrerasInscritas.find(
            (inscripcion) => inscripcion.carreraId == carreraId
        );

        if (existeInscripcion) {
            return res.status(400).json({ error: "Corredor ya inscrito en esta carrera" });
        }

        // Agregar nueva inscripción
        corredorEncontrado.carrerasInscritas.push({
            carreraId,
            fechaInscripcion: new Date(),
            montoPagado
        });

        await corredorEncontrado.save();

        return res.status(201).json({
            message: "Inscripción registrada correctamente",
            corredor: corredorEncontrado,
        });

    } catch (error) {
        console.error("Error al registrar inscripción:", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

//Put http://localhost:3000/api/corredores/:id
export const modificarCorredor = async (req,res)=>{
    try{    
        const {id} = req.params;
       const corredorModificado = await corredor.findOneAndUpdate({_id:id},req.body);  
       return res.status(200).send(corredorModificado); 

    }catch(error){
      console.log(`Error al modificar un corredor: ${error}`);
        return res.status(400).send(error);
  }
}

//Delete http://localhost:3000/api/corredores/:id
export const eliminarCorredor = async (req,res)=>{
    try{      
        const {id} = req.params;
       const data = await corredor.findOneAndDelete({_id:id});  
       return res.status(200).send(data);

    }catch(error){
      console.log(`Error al eliminar un corredor: ${error}`);
        return res.status(400).send(error);
  }
}

// DELETE http://localhost:3000/api/corredores/:id/carrerasInscritas/:idInscripcion
export const eliminarInscripcionCorredor = async (req, res) => {
    try {
        const { id, idInscripcion } = req.params;

        // Validar corredor
        const corredorEncontrado = await corredor.findById(id);
        if (!corredorEncontrado)
            return res.status(404).json({ error: 'El corredor indicado no existe en el sistema' });

        // Eliminar inscripción del modelo Inscripcion
        const eliminada = await Inscripcion.findOneAndDelete({
            _id: idInscripcion,
            corredorId: id
        });

        if (!eliminada)
            return res.status(404).json({ error: 'La inscripción no existe o no pertenece a este corredor' });

        // Quitarla también del arreglo carrerasInscritas
        corredorEncontrado.carrerasInscritas =
            corredorEncontrado.carrerasInscritas.filter(
                (inscId) => inscId.toString() !== idInscripcion
            );

        await corredorEncontrado.save();

        return res.status(200).send({
            message: "Inscripción eliminada correctamente",
            corredor: corredorEncontrado
        });

    } catch (error) {
        console.log(`Error al eliminar una inscripcion a un corredor: ${error}`);
        return res.status(400).send(error);
    }
};



const corredorController = {
    obtenerCorredores,
    obtenerCorredorById,
    obtenerCorredorByUsuarioId,
    guardarCorredor,
    modificarCorredor,
    eliminarCorredor,
    agregarInscripcionCorredor,
    eliminarInscripcionCorredor
};

export default corredorController;