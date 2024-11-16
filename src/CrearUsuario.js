import mongoose from 'mongoose';
import Usuario from './models/Usuario.js';
import dotenv from 'dotenv';

dotenv.config();

const crearUsuarioInicial = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
   
    const nuevoUsuario = new Usuario({
      nombre: 'Luis',
      apellido: 'Alvarado',
      email: 'usuariodocente@gmail.com',
      password: '123456', 
      rol: 'Docente',
    });

    await nuevoUsuario.save();
    console.log('Usuario creado exitosamente:', {
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
  } finally {
    await mongoose.connection.close();
  }
};
crearUsuarioInicial();