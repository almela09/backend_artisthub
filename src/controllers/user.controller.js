import User from "../models/User.js"
import { upload } from '../config/multerConfig.js';
import { v2 as cloudinary } from 'cloudinary';

export const getAllUser = async (req, res) => {
    try {
        if (req.tokenData.userId && req.tokenData.roleName === 'super_admin') {
            const users = await User.find({});
            res.json(users);
        } else {
            //devolver aqui el error si no es super_admin
            res.status(403).json(
                {
                    success: false,
                    message: 'access denied, only super_admin allowed'
                }
            );
        }
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'users not found',
                error: error
            }
        );
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.tokenData.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const userProfile = {
            _id: user._id, 
            name: user.name,
            nick: user.nick,
            biography: user.biography,
            avatar: user.avatar,
            email: user.email,
            socialNetwork: user.socialNetwork
        };
        res.json(userProfile);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obtaining the user profile',
            error: error.message
        });
    }
};

// export const updateUserProfile = async (req, res) => {
//     const userId = req.params.id;
//     const updateData = req.body;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
//         if (!updatedUser) {
//             return res.status(404).json(
//                 {
//                     message: 'User not found'

//                 },
//                 res.status(200).json(
//                     {
//                         message: 'profile update success',
//                         user: updatedUser
//                     }
//                 )
//             );
//         }
//     } catch (error) {
//         res.status(500).json(
//             {
//                 message: "update profile fails",
//                 error: error
//             }
//         )
//     }
// };

// export const updateUserProfile = async (req, res) => {
//     // Usar Multer para manejar la carga de la imagen
//     upload.single('image')(req, res, async function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         // Si hay un archivo en la solicitud, sube a Cloudinary
//         let imageUrl;
//         if (req.file) {
//             try {
//                 const result = await cloudinary.uploader.upload(req.file.path);
//                 imageUrl = result.secure_url;
//             } catch (uploadError) {
//                 return res.status(500).json({ error: 'Error uploading image to Cloudinary', details: uploadError.message });
//             }
//         }

//         // Datos de usuario a actualizar

//         const userId = req.params.id;
//         const updateData = req.body;

//         // Si se subió una imagen, agrega la URL de la imagen a los datos de actualización
//         if (imageUrl) {
//             updateData.avatar = imageUrl;
//         }

//         try {
//             // Actualizar el perfil del usuario en la base de datos
//             const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
//             if (!updatedUser) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             res.status(200).json({
//                 message: 'Profile update successful',
//                 user: updatedUser
//             });
//         } catch (dbError) {
//             res.status(500).json({
//                 message: "Update profile failed",
//                 error: dbError.message
//             });
//         }
//     });
// };

export const updateUserProfile = async (req, res) => {
    // Usar Multer para manejar la carga de la imagen
    upload.single('image')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

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

        // Datos de usuario a actualizar
        const userId = req.params.id;
        const updateData = {
            name: req.body.name,
            nick: req.body.nick,
            biography: req.body.biography,
            socialNetwork: req.body.socialNetwork,
        };

        // Si se subió una imagen, agrega la URL de la imagen a los datos de actualización
        if (imageUrl) {
            updateData.avatar = imageUrl;
        }

        try {
            // Actualizar el perfil del usuario en la base de datos
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'Profile update successful',
                user: updatedUser
            });
        } catch (dbError) {
            res.status(500).json({
                message: "Update profile failed",
                error: dbError.message
            });
        }
    });
};

