import { upload } from './config/multerConfig.js';
import Publication from '../models/Publication.js';
export const createPublication = async (req, res) => {
    upload.single('image')(req, res, async function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      // Tu archivo ya está en Cloudinary en este punto
      // Puedes acceder a la URL del archivo con req.file.path
      const imageUrl = req.file.path;
  
      // Ahora puedes crear tu publicación con la URL de la imagen
      // ...
    });
  };
  
  