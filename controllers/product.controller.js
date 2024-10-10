const product = require( './../models/products.model' )
const { validationResult } = require( 'express-validator' )
const errorHandler = require( './../errors/errorHandler' )
const { StatusCodes } = require( 'http-status-codes' )
const statsMassages = require( '../utilities/statsMassages' )



let getAllProducts = async ( req, res ) =>
{
    const products = await product.find()
    res
        .status( StatusCodes.OK )
        .json( {
            status: statsMassages.SUCCESS,
            data: { products, nbHits: products.length }
        } )
}

let getSingleProduct = async ( req, res ) =>
{
    const { productID } = req.params

    const singleProduct = await product.find( { _id: productID } )

    res
        .status( StatusCodes.OK )
        .json( singleProduct || { msg: "product not found" } )

}

let postNewProduct = async ( req, res ) =>
{
    try
    {
        let newProduct = req.body
        let imgFile = req.file
        req.body.productImg = JSON.stringify( imgFile?.path )
        // console.log(req.body.productImg);

        let validationErrors = validationResult( req )

        if ( validationErrors.isEmpty() )
        {
            newProduct = { ...newProduct, productImg: imgFile?.path }
            await product.create( newProduct )
            console.log( newProduct );
            res
                .status( StatusCodes.CREATED )
                .json( {
                    status: statsMassages.SUCCESS,
                    data: newProduct

                } )
        }
        else
        {
            throw ( validationErrors )
        }
    }
    catch ( err )
    {
        res
            .status( StatusCodes.NOT_FOUND )
            .json(
                {
                    msg: err,
                    success: false,
                    status: 404,
                    data: null
                }
            )
    }
}

let updateProductByID = async ( req, res ) =>
{
    const { productID } = req.params
    try
    {
        let validationErrors = validationResult( req )

        if ( !validationErrors.isEmpty() )
        {
            throw ( validationErrors )
        }
        const newProduct = req.body

        let singleProduct = await product.findOneAndUpdate( { _id: productID }, newProduct )

        res
            .status( StatusCodes.OK )
            .json( {
                status: statsMassages.SUCCESS,
                data: singleProduct
            } )
    }

    catch ( err )
    {
        res
            .status( StatusCodes.NOT_FOUND )
            .json(
                {
                    msg: err,
                    success: false,
                    status: 404,
                    data: null
                }
            )
    }
}

let deleteProductByID = async ( req, res ) =>
{
    const { productID } = req.params
    let deleted = await product.deleteOne( { _id: productID } )
    res
        .status( StatusCodes.OK )
        .json( deleted )
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    postNewProduct,
    updateProductByID,
    deleteProductByID
}