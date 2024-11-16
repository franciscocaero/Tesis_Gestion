import express from 'express';
import {
  crearLaboratorio,
  obtenerLaboratorios,
  actualizarLaboratorio,
  eliminarLaboratorio,
} from '../controllers/controladorLaboratorio.js';
import verificarAdmin from '../middlewares/VerificarAdmin.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, verificarAdmin, crearLaboratorio);
router.get('/', verificarAdmin, obtenerLaboratorios);
router.put('/:id', verificarAdmin, actualizarLaboratorio);
router.delete('/:id', verificarAdmin, eliminarLaboratorio);

export default router;
