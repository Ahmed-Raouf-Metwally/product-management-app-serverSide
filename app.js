const express = require( 'express' )
require( "dotenv" ).config();
const connectDB = require( './db/connect' )
var mongoose = require( 'mongoose' );
const cookieParser = require( 'cookie-parser' )
const path = require( 'node:path' )
const { use } = require( 'bcrypt/promises' );
const cors = require( 'cors' );
const xss = require( 'xss-clean' );
const helmet = require( 'helmet' );
const compression = require( "compression" );
const RateLimit = require( "express-rate-limit" );
const productsRouter = require( './routes/product.routes' )
const userRouter = require( './routes/user.routes' )


// Create the Express application object
const app = express()

//middlewares
app.use( express.json() )
app.use( cookieParser() )
app.use( express.static( path.join( __dirname, "" ) ) )
app.use(
    cors( {
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
        }));
app.use( xss() );
app.use(
    helmet.contentSecurityPolicy( {
        directives: {
            "script-src": [ "'self'", "code.jquery.com", "cdn.jsdelivr.net" ],
        },
    } ),
); app.use( compression() ); // Compress all routes
// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit( {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
} );
// Apply rate limiter to all requests
app.use( limiter );

//routes
app.use( '/api/v1/products', productsRouter )
app.use( '/api/v1/users', userRouter )

//connect to database and start server
const start = ( async () =>
{
    const port = process.env.PORT
    const uri = process.env.MONGO_URI;
    try
    {
        //connect DB
        await connectDB( uri )

        //start server
        app.listen( port, console.log( `Server is listening on port ${ port }...` ) )

    } catch ( error )
    {
        console.log( error )
    }

} )()