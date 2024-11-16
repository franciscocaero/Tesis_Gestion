import Laboratorio from '../models/Laboratorio.js';


export const crearLaboratorio = async (req, res) => {
  const { codigo, descripcion, numeroComputadoras, numeroProyectores } = req.body;

  try {
    const laboratorioExistente = await Laboratorio.findOne({ codigo });
    if (laboratorioExistente) {
      return res.status(400).json({ message: 'El laboratorio ya existe' });
    }

    const nuevoLaboratorio = new Laboratorio({
      codigo,
      descripcion,
      numeroComputadoras,
      numeroProyectores,
    });

    await nuevoLaboratorio.save();
    res.status(201).json(nuevoLaboratorio);
  } catch (error) {
    console.error('Error al crear laboratorio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const obtenerLaboratorios = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.find();
    res.json(laboratorios);
  } catch (error) {
    console.error('Error al obtener laboratorios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const actualizarLaboratorio = async (req, res) => {
  const { id } = req.params;
  const { codigo, descripcion, numeroComputadoras, numeroProyectores } = req.body;

  try {
    const laboratorioActualizado = await Laboratorio.findByIdAndUpdate(
      id,
      { codigo, descripcion, numeroComputadoras, numeroProyectores },
      { new: true }
    );

    if (!laboratorioActualizado) {
      return res.status(404).json({ message: 'Laboratorio no encontrado' });
    }

    res.json(laboratorioActualizado);
  } catch (error) {
    console.error('Error al actualizar laboratorio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const eliminarLaboratorio = async (req, res) => {
  const { id } = req.params;

  try {
    const laboratorioEliminado = await Laboratorio.findByIdAndDelete(id);

    if (!laboratorioEliminado) {
      return res.status(404).json({ message: 'Laboratorio no encontrado' });
    }

    res.json({ message: 'Laboratorio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar laboratorio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
