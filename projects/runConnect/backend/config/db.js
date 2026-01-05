import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI no está definida');
    }

    await mongoose.connect(uri);
    console.log('******* CONEXIÓN CON LA BD EXITOSA ********');
  } catch (error) {
    console.error('******* ERROR EN LA CONEXIÓN:', error.message);
  }
};

export default dbConnect;
