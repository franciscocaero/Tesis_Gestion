const verificarAdmin = (req, res, next) => {
    const { rol } = req.user;
  
    if (rol !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
    }
  
    next();
  };
  
  export default verificarAdmin;
  