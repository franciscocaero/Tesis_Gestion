import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const crearNuevoAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    
    await Admin.deleteOne({ email: 'admintics@gmail.com' });
    

    const nuevoAdmin = new Admin({
      nombre: 'William',
      apellido: 'Nacimba',
      email: 'admintics@gmail.com',
      password: 'Adm1TIC2024',
      rol: 'Administrador'
    });

    await nuevoAdmin.save();
    
    const passwordCorrecta = await nuevoAdmin.compararPassword('Adm1TIC2024');
    
    console.log('\n=== NUEVO ADMIN CREADO ===');
    console.log('Email:', nuevoAdmin.email);
    console.log('Password Hash:', nuevoAdmin.password);
    console.log('Verificación de contraseña:', passwordCorrecta ? 'Exitosa' : 'Fallida');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
};

crearNuevoAdmin();