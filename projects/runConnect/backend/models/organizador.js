import mongoose from "mongoose";

export const organizadorSchema = new mongoose.Schema({
    usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: true
    },
   nombre: { 
        type: String, 
        required: true, 
        trim: true 
   },
   correo:{
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true
   },
    password:{
        type: String,
   },
   telefono:{
       type: String, 
    },
    cedulaJuridica:{
        type: String, 
        required: true, 
    },
    direccion:{
        type: String,        
    },
    carrerasCreadas:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'carreras'        
        }]
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('organizadores',organizadorSchema);