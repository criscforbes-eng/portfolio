//console.log("ControllerInscripciones CARGADO");

import Inscripcion from '../models/inscripcion.js';
import Carrera from '../models/carrera.js';

//Get http://localhost:3000/api/inscripciones
export const obtenerInscripciones = async (req,res)=>{
    try{
       
        const lista = await Inscripcion.find()
        .populate("corredorId")  
        .populate("carreraId");  
        return res.status(200).send(lista);

  }catch(error){
      console.log(`Error al listar inscripciones: ${error}`);
      return res.status(400).send(error);
  }
};

//Get by Id http://localhost:3000/api/inscripciones/:id
export const obtenerInscripcionById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar por ObjectId en la colección de inscripciones
        //  populate poblar los datos relacionados
        const inscripcionEncontrada = await Inscripcion.findById(id)
            .populate('corredorId')    
            .populate('carreraId');    

        if (!inscripcionEncontrada) {
            return res.status(404).json({ message: "Inscripción no encontrada" });
        }

        return res.status(200).json(inscripcionEncontrada);
    } catch (error) {
        console.log(`Error al obtener inscripción por id: ${error}`);
        return res.status(500).send(error);
    }
};


//Post http://localhost:3000/api/inscripciones
export const guardarInscripcion = async (req, res) => {
    try {
        const { corredorId, carreraId, montoPagado, numeroCorredor } = req.body;

        // 1. Validar carrera
        const carrera = await Carrera.findById(carreraId);
        if (!carrera) {
            return res.status(404).send({ message: "Carrera no encontrada" });
        }

        // 2. Validar cupos
        if (carrera.cuposDisponibles <= 0) {
            return res.status(400).send({ message: "No hay cupos disponibles" });
        }

        // 3. Crear inscripción
        const nuevaInscripcion = await Inscripcion.create({
            corredorId,
            carreraId,
            montoPagado,
            numeroCorredor
        });

        // 4. Agregar la inscripción a la carrera
        await Carrera.findByIdAndUpdate(carreraId, {
            $push: { inscripciones: nuevaInscripcion._id }
        });

        // 5. Restar cupos
        carrera.cuposDisponibles -= 1;
        await carrera.save();

        return res.status(201).send(nuevaInscripcion);

    } catch (error) {
        console.log("Error al crear inscripción:", error);
        return res.status(500).send(error);
    }
};

//Put http://localhost:3000/api/inscripciones/:id
export const modificarInscripcion = async (req,res)=>{
    try{    
        const {id} = req.params;
       const inscripcionModificada = await Inscripcion.findOneAndUpdate({_id:id},req.body);  
       return res.status(200).send(inscripcionModificada); 

    }catch(error){
      console.log(`Error al modificar una inscripcion: ${error}`);
        return res.status(400).send(error);
  }
}
//Delete http://localhost:3000/api/inscripciones/:id
export const eliminarInscripcion = async (req,res)=>{
    try{      
        const {id} = req.params;
       const data = await Inscripcion.findOneAndDelete({_id:id});  
       return res.status(200).send(data);

    }catch(error){
      console.log(`Error al eliminar una inscripcion: ${error}`);
        return res.status(400).send(error);
  }
}

export default{
    obtenerInscripciones,
    obtenerInscripcionById,
    guardarInscripcion,
    modificarInscripcion,
    eliminarInscripcion
}