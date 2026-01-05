//console.log("ControllerOrganizadores CARGADO");
import Usuario from "../models/usuario.js";
import organizador from '../models/organizador.js';

//Get http://localhost:3000/api/organizadores
export const obtenerOrganizadores = async (req,res)=>{
    try{
       
        const lista = await organizador.find().populate('carrerasCreadas');
        return res.status(200).send(lista);

  }catch(error){
      console.log(`Error al listar organizadores: ${error}`);
      return res.status(400).send(error);
  }
};

//Get http://localhost:3000/api/organizadores/:id
export const obtenerOrganizadorById = async (req, res) => {
    try {
        const { id } = req.params;

        const organizadorEncontrado = await organizador.findById(id);

        if (!organizadorEncontrado)
            return res.status(404).send({ message: "Organizador no encontrado" });

        return res.status(200).send(organizadorEncontrado);

    } catch (error) {
        console.log("Error al obtener organizador:", error);
        return res.status(400).send(error);
    }
};

//GET http://localhost:3000/api/organizadores/by-usuario/:usuarioId
export const obtenerOrganizadorByUsuarioId = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const organizadorEncontrado = await organizador.findOne({ usuarioId })
            .populate("carrerasCreadas");

        if (!organizadorEncontrado) {
            return res.status(404).json({ message: "Organizador no encontrado por usuarioId" });
        }

        return res.status(200).json(organizadorEncontrado);

    } catch (error) {
        console.log("Error al obtener organizador por usuarioId:", error);
        return res.status(500).send(error);
    }
};

//Post http://localhost:3000/api/organizadores
export const guardarOrganizador = async (req,res)=>{
    try{
        // 1. Crear usuario primero
        const nuevoUsuario = await Usuario.create({
            nombre: req.body.nombre,
            correo: req.body.correo,
            password: req.body.password,
            rol: "organizador"
        });

        // 2. Crear organizador enlazado al usuario
        const nuevoOrganizador = await organizador.create({
            ...req.body,
            usuarioId: nuevoUsuario._id
        });

        return res.status(201).send({
            message: "Organizador registrado correctamente",
            usuario: nuevoUsuario,
            organizador: nuevoOrganizador
        });

    }catch(error){
        console.log(`Error al agregar un nuevo organizador: ${error}`);
        res.status(500).send(error);
    }
};

// POST http://localhost:3000/api/organizadores/:id/carreras
export const agregarCarreraOrganizador = async(req,res)=>{
    try{
    
        // 1. Obtener del parametro el id del organizador
        const {id} = req.params;

        // 2. Buscar ese organizador con ese ID en mongoDB
        const organizadorEncontrado = await organizador.findById(id); 

        //validar si organizador existe
        if(!organizadorEncontrado)
        return res.status(404).json({error: "Organizador no encontrado"});

        // 3. Obtener del body la carrera
        const {_id} = req.body;
        
        // 4. Asociar el id de la carrera al organizador
        organizadorEncontrado.carrerasCreadas.push(_id);

        // 5. guardar en BD el objeto modificado
        await organizadorEncontrado.save();

        return res.status(200).send(organizadorEncontrado);

    }catch(error){
        console.log(`Error al asociar una carrera a un organizador: ${error}`);
        return res.status(400).send(error);
    }
}

//Put http://localhost:3000/api/organizadores/:id
export const modificarOrganizador = async (req,res)=>{
    try{    
        const {id} = req.params;
       const organizadorModificado = await organizador.findOneAndUpdate({_id:id},req.body);  
       return res.status(200).send(organizadorModificado); 

    }catch(error){
      console.log(`Error al modificar un organizador: ${error}`);
        return res.status(400).send(error);
  }
}

//Delete http://localhost:3000/api/organizadores/:id
export const eliminarOrganizador = async (req,res)=>{
    try{      
        const {id} = req.params;
       const data = await organizador.findOneAndDelete({_id:id});  
       return res.status(200).send(data);

    }catch(error){
      console.log(`Error al eliminar un organizador: ${error}`);
        return res.status(400).send(error);
  }
}

// DELETE http://localhost:3000/api/organizadores/:id/carrerasCreadas/:idCarrera
import carrera from "../models/carrera.js";  // <-- faltaba

export const eliminarCarreraOrganizador = async (req, res) => {
    try {
        const { id, idCarrera } = req.params;

        // 1. Buscar organizador
        const organizadorEncontrado = await organizador.findById(id);
        if (!organizadorEncontrado)
            return res.status(404).json({ error: "Organizador no encontrado" });

        // 2. Validar que la carrera exista
        const carreraEncontrada = await carrera.findById(idCarrera);
        if (!carreraEncontrada)
            return res.status(404).json({ error: 'La carrera indicada no existe en el sistema' });

        // 3. Remover la carrera del arreglo carrerasCreadas
        const index = organizadorEncontrado.carrerasCreadas
        .findIndex(c => c.toString() === idCarrera);
        if (index === -1)
            return res.status(404).json({ error: 'La carrera no está asociada al organizador' });

        organizadorEncontrado.carrerasCreadas.splice(index, 1);

        // 4. Guardar cambios
        await organizadorEncontrado.save();

        return res.status(200).send({
            message: "Carrera eliminada correctamente del organizador",
            organizador: organizadorEncontrado
        });

    } catch (error) {
        console.log(`Error al eliminar una carrera de un organizador: ${error}`);
        return res.status(400).send(error);
    }
};



const organizadorController = {
    obtenerOrganizadores,
    obtenerOrganizadorById,
    obtenerOrganizadorByUsuarioId,
    guardarOrganizador,
    modificarOrganizador,
    eliminarOrganizador,
    agregarCarreraOrganizador,
    eliminarCarreraOrganizador
};

export default organizadorController;