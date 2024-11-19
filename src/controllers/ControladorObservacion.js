import Observacion from '../models/Observacion.js';
import Solicitud from '../models/SolicitudSoporte.js';


export const crearObservacion = async (req, res) => {
  try {
    const { solicitudId, explicacion } = req.body;

    const solicitud = await Solicitud.findById(solicitudId);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    const autor = req.user.nombre;
    const rol = req.user.rol;


    const nuevaObservacion = new Observacion({
      solicitudId,
      autor,
      rol,
      explicacion,
    });


    await nuevaObservacion.save();

    res.status(201).json(nuevaObservacion);
  } catch (error) {
    console.error('Error al crear la observación:', error);
    res.status(500).json({ message: 'Error al crear la observación', error });
  }
};


export const listarObservaciones = async (req, res) => {
  const { solicitudId } = req.params;

  try {
    const observaciones = await Observacion.find({ solicitudId }).sort({ createdAt: -1 });
    res.json(observaciones);
  } catch (error) {
    console.error('Error al listar observaciones:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const eliminarObservacion = async (req, res) => {
  const { id } = req.params;

  try {
    const observacion = await Observacion.findById(id);
    if (!observacion) {
      return res.status(404).json({ message: 'Observación no encontrada' });
    }

    await Observacion.findByIdAndDelete(id);
    res.json({ message: 'Observación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar observación:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
