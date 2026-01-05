import dotenv from 'dotenv';
dotenv.config();
console.log('ENV MONGODB_URI:', process.env.MONGODB_URI); // 👈 prueba clave


console.log(">>> EJECUTANDO APP.JS CORRECTO <<<");

import express from "express";
import cors from "cors";
import routesCarreras from './routes/routesCarreras.js';
import routesInscripciones from './routes/routesInscripciones.js';
import routesCorredores from './routes/routesCorredores.js';
import routesOrganizadores from './routes/routesOrganizadores.js';
import RoutesUsuarios from './routes/routesUsuarios.js';
import { dbConnect } from './config/db.js';

const app = express();

// CORS: allow the frontend origin configured via env or default to localhost:8000
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:8000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Logger global - Requests recibidos
app.use((req, res, next) => {
    console.log("➡ Request recibido:", req.method, req.url);
    next();
});

// Conectar BD
dbConnect();

// Montar rutas
app.use('/api/carreras', routesCarreras);
app.use('/api/inscripciones', routesInscripciones);
app.use('/api/corredores', routesCorredores);
app.use('/api/organizadores', routesOrganizadores);
app.use('/api/usuarios', RoutesUsuarios);

// Server: read PORT from env with fallback
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
