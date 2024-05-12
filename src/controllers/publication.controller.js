import { upload } from './config/multerConfig.js';
import Publication from '../models/Publication.js';
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
  