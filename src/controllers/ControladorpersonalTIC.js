import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';

export const loginTICs = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, rol: 'PersonalTICs' });
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await usuario.compararPassword(password);
    
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { 
        id: usuario._id, 
        rol: usuario.rol,
        email: usuario.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const cambiarPasswordTICs = async (req, res) => {
  const { email, antContraseña, nuevaContraseña, confirmarContraseña } = req.body;

  try {
    // Validación de campos
    if (!email || !antContraseña || !nuevaContraseña || !confirmarContraseña) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validación de contraseña nueva
    if (nuevaContraseña.length < 6) {
      return res.status(400).json({ 
        message: 'La nueva contraseña debe tener al menos 6 caracteres' 
      });
    }

    const usuarioEncontrado = await Usuario.findOne({ email, rol: 'PersonalTICs' });
    
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await usuarioEncontrado.compararPassword(antContraseña);
    
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    if (nuevaContraseña !== confirmarContraseña) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    usuarioEncontrado.password = nuevaContraseña;
    await usuarioEncontrado.save();

    res.json({ 
      message: 'Contraseña actualizada exitosamente',
      email: usuarioEncontrado.email
    });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};