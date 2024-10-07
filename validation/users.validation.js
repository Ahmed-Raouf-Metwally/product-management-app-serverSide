const { body } = require('express-validator')
const user = require('../models/user.model')


const userValidation = () => {

    return [

        body('name')
            .notEmpty()
            .withMessage('name is required')
            .isString()
            .withMessage('name must be a string')
            .isLength({ min: 3 })
            .withMessage('name must be at least 3 characters long')
            .isLength({ max: 12 })
            .withMessage('name must be at most 12 characters long'),

        body('email')
            .notEmpty()
            .withMessage('email is required')
            .isEmail()
            .withMessage('email must be a valid email')
            .isLength({ max: 30 })
            .withMessage('email must be at most 30 characters long')
            .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
            .withMessage('email must be a valid email')
            .custom(async (data) => {
                let checkUser = await user.findOne({ email: data })
                if (checkUser) {
                    throw new Error('email already exists')
                }
                return true
            })
        ,

        body('password')
            .notEmpty()
            .withMessage('password is required')
            .isString()
            .withMessage('password must be a string')
            .isLength({ min: 8 })
            .withMessage('password must be at least 8 characters long')
            .isLength({ max: 16 })
            .withMessage('password must be at most 16 characters long')
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)
            .withMessage('password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

        body('address')
            .notEmpty()
            .withMessage('address is required')
            .isString()
            .withMessage('address must be a string')
            .isLength({ min: 3 })
            .withMessage('address must be at least 3 characters long')
            .isLength({ max: 30 })
            .withMessage('address must be at most 30 characters long'),


        body('phone')
            .notEmpty()
            .withMessage('phone is required')
            .isString()
            .withMessage('phone must be a string')
            .matches(/^01[0125]\d{8}$/)
            .withMessage('address must be a valid Egyptian phone number')
            .custom(async (data) => {
                let checkUser = await user.findOne({ phone: data })
                if (checkUser) {
                    throw new Error('phone already exists')
                }
                return true
            }),
    ]
}

module.exports = userValidation