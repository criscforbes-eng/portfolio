import mongoose from "mongoose";

export const corredorSchema = new mongoose.Schema({
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
    cedulaIdentidad:{
        type: String, 
        required: true, 
    },
    fechaNacimiento:{
        type: String,        
    },
    edad:{
        type: Number,    
    },
    carrerasInscritas: [{
        carreraId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carreras',
            required: true
        },
        fechaInscripcion: {
            type: Date,
            default: Date.now
        },
        montoPagado: {
            type: Number
        }
    }]
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('corredores',corredorSchema);