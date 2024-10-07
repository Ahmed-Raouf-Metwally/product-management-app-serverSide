const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const userValidation = require('../validation/users.validation')

router
    .route('/login')
    .post(userController.login)

router
    .route('/register')
    .post(userValidation(), userController.register)

router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/:userID')
    .get(userController.getSingleUser)
    .patch(userController.updatePassword)

module.exports = router