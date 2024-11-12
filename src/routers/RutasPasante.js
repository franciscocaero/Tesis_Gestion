import express from 'express';
import { cambiarPasswordPasante, loginPasante } from '../controllers/ControladorPasante.js';

const router = express.Router();

router.post('/login-pasante', loginPasante);
router.post('/cambiar-password-pasante', cambiarPasswordPasante);

export default router;