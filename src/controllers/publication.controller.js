import { upload } from '../config/multerConfig.js';
import Publication from '../models/Publication.js';
export const createPublication = async (req, res) => {
  // Verificar si req.file está disponible
  let imageUrl = '';
  if (req.file && req.file.path) {
    imageUrl = req.file.path;
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


export const putLikes = async (req, res) => {
  try {
      const publicationId = req.params.id;
      const userId = req.tokenData.userId;
      const findPublication = await Publication.findById(publicationId);
      if (!findPublication) {
          return res.status(404).json({
              success: false,
              message: "Publication not found"
          });
      }
      const index = findPublication.like.indexOf(userId);
      if (index > -1) {
          findPublication.like.splice(index, 1);
      } else {
          findPublication.like.push(userId);
      }

      await findPublication.save();

      res.status(200).json({
          success: true,
          message: "Publication like status updated successfully",
          data: findPublication
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error updating publication like status",
          error: error.message
      });
  }
};

export const removeLikes = async (req, res) => {
  try {
      const publicationId = req.params.id;
      const userId = req.tokenData.userId;
      const findPublication = await Publication.findById(publicationId);
      if (!findPublication) {
          return res.status(404).json({
              success: false,
              message: "Publication not found"
          });
      }
      const index = findPublication.like.indexOf(userId);
      if (index > -1) {
          findPublication.like.splice(index, 1); // Remove like if found
          await findPublication.save();
          res.status(200).json({
              success: true,
              message: "Like removed successfully",
              data: findPublication
          });
      } else {
          res.status(200).json({
              success: false,
              message: "Like not found on this publication",
              data: findPublication
          });
      }
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error removing like",
          error: error.message
      });
  }
};

export const getAllPublications = async (req, res) => {
  try {
      const findPublications = await Publication.find({});
      if (findPublications.length === 0) {
          return res.status(404).json({
              success: false,
              message: "No publications found"
          });
      }
      res.status(200).json({
          success: true,
          message: "All publications retrieved",
          data: findPublications
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Publications didn't retrieved",
          error: error.message
      });
  }
};

export const getPublicationById = async (req, res) => {  //UNA PUBLICACION POR ID
  const { id } = req.params; 

  try {
      const publication = await Publication.findById(id); 

      if (!publication) {
          return res.status(404).json({ message: 'Publication not found' }); 
      }

      res.status(200).json(publication); 
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving publication', error: error.message }); 
  }
};



export const getAllPublicationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
      console.log(`Buscando publicaciones para el usuario con ID: ${userId}`);

      // Usa `populate` para reemplazar el ID del usuario con el documento de usuario completo
      const publications = await Publication.find({ user: userId }).populate('user');

      if (!publications || publications.length === 0) {
          console.log('No se encontraron publicaciones para el usuario especificado.');
          return res.status(404).json({ message: 'Publications not found' });
      }

      console.log('Publicaciones encontradas:', publications);
      res.status(200).json(publications);
  } catch (error) {
      console.error('Error al recuperar las publicaciones:', error);
      res.status(500).json({ message: 'Error retrieving publications', error: error.message });
  }
};

//PUBLICACIONES DE 1 USUARIO TODAS.

