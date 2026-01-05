import mongoose from "mongoose";

export const usuarioSchema = new mongoose.Schema({
   correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
   },
   password: {
        type: String,
        required: true
   },
   rol: {
        type: String,
        enum: ["corredor", "organizador"],
        required: true
   }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("usuarios", usuarioSchema);

