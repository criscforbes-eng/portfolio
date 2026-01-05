import mongoose from "mongoose";

export const carreraSchema = new mongoose.Schema({
   nombre: { 
        type: String, 
        required: true, 
        trim: true 
   },
   fechaCreacion:{
        type: Date,
        default: Date.now
   },
    fechaHoraInicio:{
        type: Date,
   },
   lugar:{
       type: String, 
       required: true, 
       trim: true 
    },
    cuposDisponibles:{
        type: Number, 
        required: true, 
    },
    imagen:{
        type: Buffer,
    },
    estado:[{
       type:String 
    }],
    organizador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'organizadores'   
    },
    precio:{
        type: Number, 
        required: true, 
    },
    inscripciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "inscripciones"
}]
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('carreras',carreraSchema);