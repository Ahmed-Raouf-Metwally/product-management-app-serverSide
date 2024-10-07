const user = require("../models/user.model");
const { validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { StatusCodes } = require('http-status-codes');



const register = async (req, res) => {

    try {
        //get user data
        let newUserData = req.body

        //validation
        let validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                errors: validationErrors.array(),
                success: false,
                status: 400,
                msg: 'validation error'
            })
        }

        // Get bcrypt salt rounds from .env or use a default value
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

        //hash password
        let hashedPassword = await bcrypt.hash(newUserData.password, saltRounds)
        await user.create({ ...newUserData, password: hashedPassword })

        //send response
        res
            .status(StatusCodes.CREATED)
            .json({
            msg: 'user created Successfully',
            user: { ...newUserData, password: hashedPassword },
            success: true,
            status: 200,
            error: null
        })

    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: 'error', error })
    }
}

const login = async (req, res) => {
    try {
        //get user data
        let credentials = req.body
        let checkUser = await user.findOne({ email: credentials.email })
        if (!checkUser) {
            throw ('user not found')
        }
        let passwordMatch = await bcrypt.compare(credentials.password, checkUser.password)
        if (!passwordMatch) {
            throw ('password does not match')
        }

        //generate token
        let token = jwt.sign({ id: checkUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' })

        //set token in cookie
        res
            .status(StatusCodes.OK)
            .cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, //1 day
            sameSite: 'none',
            secure: true
        })

        //send response
        res
            .status(StatusCodes.OK)
            .json({
            msg: 'user logged in Successfully',
            user: checkUser,
            success: true,
            status: 200,
            error: null
        })
    }
    catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: 'error', error })
    }
}
const getAllUsers = async (req, res) => {
    try {

    } catch (error) {

    }

}

const getSingleUser = async (req, res) => {

    try {

    } catch (error) {

    }

}

const updatePassword = async (req, res) => {

    try {

    } catch (error) {

    }

}

const updateUserData = async (req, res) => {

    try {

    } catch (error) {

    }

}

module.exports = {
    register,
    login,
    getAllUsers,
    getSingleUser,
    updatePassword,
    updateUserData
}

