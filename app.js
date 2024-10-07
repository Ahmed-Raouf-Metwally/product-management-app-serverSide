const express = require('express')
const app = express()
require("dotenv").config();
const connectDB = require('./db/connect')
var mongoose = require('mongoose');
const productsRouter = require('./routes/product.routes')
const userRouter = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const path = require('node:path')
const cors = require( 'cors' );
const xss = require( 'xss-clean' );
const helmet = require( 'helmet' );
const { use } = require( 'bcrypt/promises' );


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"")))

app.use(cors());
app.use(xss());
app.use(helmet());

//routes

app.use('/api/v1/products', productsRouter)
app.use( '/api/v1/users', userRouter )


//connect to databaseexpress. and start server
const start = ( async () =>
{
    const port = process.env.PORT
    const uri = process.env.MONGO_URI ;
    try {
        
        //connect DB
        await connectDB(uri)

        //start server
        app.listen(port, console.log(`Server is listening on port ${port}...`))
        
    } catch (error) {
        console.log(error)
    }

})()