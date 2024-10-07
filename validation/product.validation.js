const { body } = require('express-validator')

const productValidation = () => {

    return [
        body('productName')
            .notEmpty()
            .withMessage('product name is required')
            .isString()
            .withMessage('product name must be a string')
            .isLength({ min: 3 })
            .withMessage('product name must be at least 3 characters long')
            .isLength({ max: 12 })
            .withMessage('product name must be at most 12 characters long'),

        // body('productImg')
        //     .notEmpty()
        //     .withMessage('product image is required')
        //     .isString()
        //     .withMessage('product image must be a string'),

        body('productPrice')
            .notEmpty()
            .withMessage('product price is required')
            .isNumeric()
            .withMessage('product price must be a number')
            .isFloat({ min: 0.01 })
            .withMessage('product price must be at least 0.01'),

        body('productCategory')
            .notEmpty()
            .withMessage('product category is required')
            .isString()
            .withMessage('product category must be a string')
            .isLength({ min: 3 })
            .withMessage('product category must be at least 3 characters long')
            .isLength({ max: 12 })
            .withMessage('product category must be at most 12 characters long'),

        body('productSupplier')
            .notEmpty()
            .withMessage('product supplier is required')
            .isString()
            .withMessage('product supplier must be a string')
            .isLength({ min: 3 })
            .withMessage('product supplier must be at least 6 characters long')
            .isLength({ max: 12 })
            .withMessage('product supplier must be at most 12 characters long'),

        body('productQuantity')
            .notEmpty()
            .withMessage('product quantity is required')
            .isNumeric()
            .withMessage('product quantity must be a number')
            .isInt({ min: 0 })
            .withMessage('product quantity must be at least 0'),

        body('productAvailable')
            .notEmpty()
            .withMessage('product available is required')
            .isBoolean()
            .withMessage('product available must be a boolean'),

        body('productRating')
            .notEmpty()
            .withMessage('product rating is required')
            .isNumeric()
            .withMessage('product rating must be a number')
            .isFloat({ min: 0.01 })
            .withMessage('product rating must be at least 0.01')
            .isFloat({ max: 5 })
            .withMessage('product rating must be at most 5'),

        body('productDescription')
            .notEmpty()
            .withMessage('product description is required')
            .isString()
            .withMessage('product description must be a string')
            .isLength({ min: 6 })
            .withMessage('product description must be at least 6 characters long')
            .isLength({ max: 255 })
            .withMessage('product description must be at most 12 characters long')
    ]
}

module.exports = productValidation