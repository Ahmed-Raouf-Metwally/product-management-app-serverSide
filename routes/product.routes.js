const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const productValidation = require('../validation/product.validation')
const authMiddleWare = require('../middlewares/auth.middleware')
const upload = require('../utilities/upload.products')
router
    .route('/')
    .get(productController.getAllProducts)
    .post(upload.single('productImg'), authMiddleWare, productValidation(), productController.postNewProduct)
    
router
    .route('/:productID')
    .get(productController.getSingleProduct)
    .patch(upload.single('productImg'), authMiddleWare, productValidation(), productController.updateProductByID)
    .delete(authMiddleWare, productController.deleteProductByID)

module.exports = router