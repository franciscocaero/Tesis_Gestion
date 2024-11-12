import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, rol: 'Administrador' });
    
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    const passwordValida = await admin.compararPassword(password);
    
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        rol: admin.rol,
        email: admin.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        nombre: admin.nombre,
        email: admin.email,
        rol: admin.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      message: 'Error en el servidor'
    });
  }
};


