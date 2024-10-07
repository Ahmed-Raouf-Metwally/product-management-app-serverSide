const mongoose = require("mongoose")
const productSchema =
    mongoose.Schema(
        {
            productName: {
                type: String,
                min: 3,
                max: 12,
                required: [true, 'product name must be provided']

            },
            productImg: {
                type: String
            },
            productPrice: {
                type: Number,
                required: [true, 'product price must be provided']
            },
            productCategory: {
                type: String,
                min: 3,
                max: 12,
                required: [true, 'product category must be provided']

            },
            productSupplier: {
                type: String,
                min: 3,
                max: 12,
                required: [true, 'product supplier must be provided']

            },
            productQuantity: {
                type: Number,
                required: [true, 'product quantity must be provided']
            },
            productAvailable: {
                type: Boolean,
                default: true
            },
            productRating: {
                type: Number,
                default: 4.5
            },
            productDescription: {
                type: String,
                min: 6,
                max: 255,
                required: [true, 'product description must be provided']

            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        })

module.exports = mongoose.model('product', productSchema)