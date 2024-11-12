
import express from 'express';
import { loginDocente, cambiarPasswordDocente } from '../controllers/ControladorDocente.js';

const router = express.Router();

router.post('/login-docente', loginDocente);
router.post('/cambiar-password-docente', cambiarPasswordDocente);

export default router;
