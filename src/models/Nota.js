import mongoose from 'mongoose';

const notaSchema = new mongoose.Schema({
  solicitudId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solicitud',
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
    trim: true,
  },
  autor: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: 'Administrador',
    required: true,
  },
}, {
  timestamps: true,
});

const Nota = mongoose.model('Nota', notaSchema);
export default Nota;
