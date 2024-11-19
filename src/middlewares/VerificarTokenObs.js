import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import Admin from '../models/Admin.js';

export const verificarTokenObs = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      usuario = await Admin.findById(decoded.id);
    }

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    req.user = {
      id: usuario._id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

