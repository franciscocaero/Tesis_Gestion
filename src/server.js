import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import rutasTics from './routers/RutasPersonalTIC.js';
import rutasDocente from './routers/RutasDocente.js';
import rutasServicio from './routers/RutasAyudanteServicios.js';
import rutasPasante from './routers/RutasPasante.js';
import rutasAdmin from './routers/RutasAdmin.js';
import rutasLaboratorios from './routers/RutasLaboratorios.js';
import rutasSoporte from './routers/RutasSoporte.js';
import rutasObservacion from './routers/RutasObservacion.js';
import rutasNotas from './routers/RutasNotas.js';


dotenv.config();


const app = express();


app.use(express.json()); 
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/api/tics', rutasTics);
app.use('/api/docentes', rutasDocente);
app.use('/api/servicios', rutasServicio);
app.use('/api/pasantes', rutasPasante);
app.use('/api/admin', rutasAdmin);
app.use('/api/laboratorios', rutasLaboratorios);
app.use('/api/soporte', rutasSoporte);
app.use('/api/observaciones', rutasObservacion);
app.use('/api/notas', rutasNotas);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal, por favor intenta más tarde.' });
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});






app.use((req,res)=>res.status(404).send("Error 404"))




export default  app