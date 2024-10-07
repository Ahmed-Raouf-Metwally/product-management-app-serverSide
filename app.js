const express = require('express')
const app = express()
require("dotenv").config();
const connectDB = require('./db/connect')
var mongoose = require('mongoose');
const productsRouter = require('./routes/product.routes')
const userRouter = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const path = require('node:path')

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"")))


//routes
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', userRouter)

//connect to database and start server
const start = (async () => {
    const port = process.env.PORT || 3000
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ODC';
    try {
        
        //connect DB
        await connectDB(uri)

        //start server
        app.listen(port, console.log(`Server is listening on port ${port}...`))
        
    } catch (error) {
        console.log(error)
    }

})()