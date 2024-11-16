
import SolicitudSoporte from '../models/SolicitudSoporte.js';
import Laboratorio from '../models/Laboratorio.js';


export const crearSolicitud = async (req, res) => {
  const { titulo, descripcion, laboratorio, equipo } = req.body;
  const { id: usuarioId } = req.user;

  try {
    const nuevaSolicitud = new SolicitudSoporte({
      titulo,
      descripcion,
      laboratorio,
      equipo,
      creadoPor: usuarioId,
    });

    await nuevaSolicitud.save();
    res.status(201).json({ message: 'Solicitud creada exitosamente', solicitud: nuevaSolicitud });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ message: 'Error al crear la solicitud' });
  }
};


export const actualizarEstadoSolicitud = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const { rol } = req.user;

  if (!['Administrador', 'PersonalTICs'].includes(rol)) {
    return res.status(403).json({ message: 'No tienes permisos para actualizar esta solicitud' });
  }

  try {
    const solicitud = await SolicitudSoporte.findById(id);

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    solicitud.estado = estado;
    await solicitud.save();

    res.json({ message: 'Estado de la solicitud actualizado', solicitud });
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    res.status(500).json({ message: 'Error al actualizar la solicitud' });
  }
};
