import mongoose from "mongoose";

export const inscripcionSchema = new mongoose.Schema({
   corredorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "corredores",   // nombre del modelo
        required: true,
   },
   carreraId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "carreras",     // nombre del modelo
        required: true, 
   },
    montoPagado:{
        type: Number, 
        required: true, 
   },
   numeroCorredor:{
       type: Number, 
        required: true, 
        unique: true
    }
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('inscripciones',inscripcionSchema);