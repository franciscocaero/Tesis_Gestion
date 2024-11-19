import express from 'express';
import { crearObservacion, listarObservaciones, eliminarObservacion } from '../controllers/ControladorObservacion.js';
import { verificarTokenObs } from '../middlewares/VerificarTokenObs.js';

const router = express.Router();

router.post('/crear', verificarTokenObs, crearObservacion);
router.get('/listar/:solicitudId', verificarTokenObs, listarObservaciones);
router.delete('/eliminar/:id', verificarTokenObs, eliminarObservacion);

export default router;
