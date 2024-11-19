import express from 'express';
import { crearNota, listarNotas, eliminarNota } from '../controllers/ControladorNota.js';
import { verificarTokenObs } from '../middlewares/verificarTokenObs.js';

const router = express.Router();

router.post('/crear', verificarTokenObs, crearNota);
router.get('/listar/:solicitudId', verificarTokenObs, listarNotas);
router.delete('/eliminar/:id', verificarTokenObs, eliminarNota);

export default router;
