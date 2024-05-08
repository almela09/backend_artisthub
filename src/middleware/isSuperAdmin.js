export const isSuperAdmin = (req, res, next) => {
    
    try {
        if (req.tokenData.roleName !== 'super_admin') { 
            return res.status(401).json(
                {
                    success: false,
                    message: "unauthorized"
                }
            )
        }
        next();
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "You don't have permisions",
                error: error.message
            }
        )
    }
}