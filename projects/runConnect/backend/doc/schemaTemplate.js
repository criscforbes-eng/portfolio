import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, min: 0, max: 120 },
    email: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    profilePicture: { type: Buffer }, // Imagen en formato binario
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Referencia a otros usuarios
    metadata: { type: mongoose.Schema.Types.Mixed }, // Puede ser cualquier cosa
    preferences: { type: Map, of: String }, // Mapa de configuración personalizada
    balance: { type: mongoose.Schema.Types.Decimal128 }, // Para valores financieros precisos
    bigNumber: { type: mongoose.Schema.Types.BigInt }, // Para números enteros grandes
    uuid: { type: mongoose.Schema.Types.UUID } // UUID (a partir de Mongoose 7.3)
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("User", UserScheme);
