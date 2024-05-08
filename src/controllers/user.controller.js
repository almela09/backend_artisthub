import User from "../models/User.js"
// import upload from "../config/multerConfig.js"; 
import multer from 'multer';


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
        //console.log(req);
        const user = await User.findById(req.tokenData.userId);
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'user not found',
                    error: error.message
                }
            );
        }
        const userProfile = {  
            name: user.name,
            nick: user.nick,
            biography: user.biography,
            avatar: user.avatar,
            email: user.email,
        };
        res.json(userProfile);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error obtaining the user profile',
                error: error.message
            }
        )
    }
};

export const updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json(
                {
                    message: 'User not found'

                },
                res.status(200).json(
                    {
                        message: 'profile update success',
                        user: updatedUser
                    }
                )
            );
        }
    } catch (error) {
        res.status(500).json(
            {
                message: "update profile fails",
                error: error
            }
        )
    }
};
// export const uploadUserProfileImage = async (req, res) => {
//     try {
//         upload.single('avatar')(req, res, async function(err) {
//             if (err instanceof multer.MulterError) {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Multer error during upload',
//                     error: err.message
//                 });
//             } else if (err) {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Unknown error during upload',
//                     error: err.message
//                 });
//             }

//             try {
//                 // Aquí, la imagen ha sido cargada y puedes acceder a ella a través de req.file
//                 const user = await User.findByIdAndUpdate(req.tokenData.userId, { avatar: req.file.path }, { new: true });
//                 res.json({
//                     success: true,
//                     message: 'Profile image uploaded successfully',
//                     data: user
//                 });
//             } catch (error) {
//                 res.status(500).json({
//                     success: false,
//                     message: 'Error updating user profile',
//                     error: error.message
//                 });
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error updating user profile',
//             error: error.message
//         });
//     }
// };

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  export const uploadUserProfileImage = async (req, res) => {
      try {
          upload.single('avatar')(req, res, async function(err) {
              if (err instanceof multer.MulterError) {
                  return res.status(500).json({
                      success: false,
                      message: 'Multer error during upload',
                      error: err.message
                  });
              } else if (err) {
                  return res.status(500).json({
                      success: false,
                      message: 'Unknown error during upload',
                      error: err.message
                  });
              }
  
              try {
                  // Aquí, la imagen ha sido cargada y puedes acceder a ella a través de req.file
                  const user = await User.findByIdAndUpdate(req.tokenData.userId, { avatar: req.file.path }, { new: true });
                  res.json({
                      success: true,
                      message: 'Profile image uploaded successfully',
                      data: user
                  });
              } catch (error) {
                  res.status(500).json({
                      success: false,
                      message: 'Error updating user profile',
                      error: error.message
                  });
              }
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Error updating user profile',
              error: error.message
          });
      }
  };