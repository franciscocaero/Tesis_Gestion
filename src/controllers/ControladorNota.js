import Nota from '../models/Nota.js';
import Solicitud from '../models/SolicitudSoporte.js';

export const crearNota = async (req, res) => {
  try {
    const { solicitudId, mensaje } = req.body;

    const solicitud = await Solicitud.findById(solicitudId);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

  
    if (req.user.rol !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado. Solo el Administrador puede crear notas.' });
    }

    const autor = req.user.nombre;
    const rol = req.user.rol;
    const nuevaNota = new Nota({
      solicitudId,
      mensaje,
      autor,
      rol,
    });

    await nuevaNota.save();

    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al crear la nota:', error);
    res.status(500).json({ message: 'Error al crear la nota', error });
  }
};

export const listarNotas = async (req, res) => {
  const { solicitudId } = req.params;

  try {
    const notas = await Nota.find({ solicitudId }).sort({ createdAt: -1 });
    res.json(notas);
  } catch (error) {
    console.error('Error al listar notas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const eliminarNota = async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await Nota.findById(id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }


    if (req.user.rol !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado. Solo el Administrador puede eliminar notas.' });
    }

    await Nota.findByIdAndDelete(id);
    res.json({ message: 'Nota eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
