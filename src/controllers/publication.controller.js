import { upload } from '../config/multerConfig.js';
import Publication from '../models/Publication.js';
import cloudinary from 'cloudinary';

export const createPublication = async (req, res) => {
  // Usar Multer para manejar la carga de la imagen
  upload.single('image')(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Si hay un archivo en la solicitud, sube a Cloudinary
    let imageUrl = '';
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ error: 'Error uploading image to Cloudinary', details: uploadError.message });
      }
    }

    // Datos de publicación a crear
    const { title, text } = req.body;
    const userId = req.tokenData.userId;  // Asume que userId está en tokenData

    const newPublication = new Publication({
      user: userId,
      title: title || '',  // Proporciona un título vacío si no se proporciona
      text,
      image: imageUrl,
      publishedAt: Date.now(),
      like: []
    });

    try {
      // Guardar la nueva publicación en la base de datos
      const savedPublication = await newPublication.save();
      res.status(201).json({
        message: 'Publication created successfully',
        publication: savedPublication
      });
    } catch (dbError) {
      res.status(500).json({
        message: 'Error creating publication',
        error: dbError.message
      });
    }
  });
};
export const updatePublication = async (req, res) => {
  // Obtener la ID de la publicación y los datos a actualizar
  const publicationId = req.params.id;
  const { title, text } = req.body;

  // Si hay un archivo en la solicitud, sube a Cloudinary
  let imageUrl;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } catch (uploadError) {
      return res.status(500).json({ error: 'Error uploading image to Cloudinary', details: uploadError.message });
    }
  }

  // Construir los datos de actualización
  const updateData = {
    title,
    text
  };

  // Si se subió una nueva imagen, agregar la URL de la imagen a los datos de actualización
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  try {
    // Actualizar la publicación en la base de datos
    const updatedPublication = await Publication.findByIdAndUpdate(publicationId, updateData, { new: true, runValidators: true });
    if (!updatedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.status(200).json({
      message: 'Publication updated successfully',
      publication: updatedPublication
    });
  } catch (dbError) {
    res.status(500).json({
      message: "Update publication failed",
      error: dbError.message
    });
  }
};

export const deletePublication = async (req, res) => {
  try {
    // Obtener la ID de la publicación desde los parámetros de la URL
    const publicationId = req.params.id;

    // Buscar y eliminar la publicación
    const deletedPublication = await Publication.findByIdAndDelete(publicationId);

    // Si la publicación no se encuentra, devolver un error 404
    if (!deletedPublication) {
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      });
    }

    // Responder con éxito si la publicación se eliminó correctamente
    res.status(200).json({
      success: true,
      message: 'Publication deleted successfully',
      publication: deletedPublication
    });
  } catch (error) {
    // Manejar errores y devolver un estado 500
    res.status(500).json({
      success: false,
      message: 'Error deleting publication',
      error: error.message
    });
  }
};