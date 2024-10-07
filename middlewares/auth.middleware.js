const jwt = require("jsonwebtoken")
const { StatusCodes } = require('http-status-codes');



const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt
        if (!token) {
            throw ('please login')
        }
        const verifyUser = await jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyUser) {
            throw ('Invalid User')
        }
        next()
    }
    catch (error) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({
            msg: error,
            success: false,
            status: 401,
        })
    }
}

module.exports = authMiddleWare