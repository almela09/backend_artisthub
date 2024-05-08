import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "unauthorized"
                }
            )
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.tokenData = decoded
        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "JWT not valid or malformed",
                error: error.message
            }
        )
    }
}