import express from 'express';
import { cambiarPasswordAyudanteServicios, loginAyudanteServicios } from '../controllers/ControladorAyudanteServicios.js';

const router = express.Router();

router.post('/login-ayudante', loginAyudanteServicios);
router.post('/cambiar-password-ayudante', cambiarPasswordAyudanteServicios);

export default router;