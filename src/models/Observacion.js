import mongoose from 'mongoose';

const observacionSchema = new mongoose.Schema({
  solicitudId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solicitud',
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['Administrador', 'Pasante', 'PersonalTICs'],
    required: true,
  },
  explicacion: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Observacion = mongoose.model('Observacion', observacionSchema);
export default Observacion;
