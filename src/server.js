
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import rutasTics from './routers/RutasPersonalTIC.js';
import rutasDocente from './routers/RutasDocente.js'; 
import rutasServicio from './routers/RutasAyudanteServicios.js';
import RutasPasante from './routers/RutasPasante.js';
import RutasAdmin from './routers/RutasAdmin.js';

const app = express()
dotenv.config()

app.set('port',process.env.port || 3000)
app.use(cors())

app.use(express.json())


app.use('/api/tics',rutasTics);
app.use('/api/docentes', rutasDocente);
app.use('/api/servicios', rutasServicio);
app.use('/api/pasantes', RutasPasante);
app.use('/api/admin', RutasAdmin);






app.use((req,res)=>res.status(404).send("Error 404"))




export default  app