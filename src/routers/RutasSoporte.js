import express from 'express';
import { crearSolicitud, actualizarEstadoSolicitud } from '../controllers/ControladorSolicitudSoporte.js';
import { verificarToken } from '../middlewares/VerificarToken.js';

const router = express.Router();

router.post('/crear', verificarToken, crearSolicitud);
router.patch('/actualizar/:id', verificarToken, actualizarEstadoSolicitud);

export default router;
