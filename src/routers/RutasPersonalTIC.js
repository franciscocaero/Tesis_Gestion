import express from 'express';
import { cambiarPasswordTICs, loginTICs,  } from '../controllers/ControladorpersonalTIC.js'; 

const router = express.Router();

router.post('/login-tics', loginTICs);
router.post('/cambiar-password-tics', cambiarPasswordTICs);

export default router;
