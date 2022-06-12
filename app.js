const express = require( 'express' );
const app = express();
require( 'dotenv' ).config( {
    path : './config/config.env'
} )
const { PORT } = process.env;
const bodyParser = require( 'body-parser' );
const { graphqlHTTP } = require( 'express-graphql' );
const connectDatabase = require( "./helpers/database/connectDatabase" );
const graphQlSchema = require( './graphql/schema/index' );
const graphQlResolvers = require( './graphql/resolvers/index' );
const isAuth = require( './middlewares/auth/auth' );
connectDatabase();
app.use( isAuth );
app.use( '/graphql',graphqlHTTP( {
    schema : graphQlSchema,
    rootValue : graphQlResolvers,
    graphiql : true,
} ) )
app.use( bodyParser.json() );


app.listen( PORT || 5001,() => {
    console.log( `Server is running on port ${PORT} -> http://localhost:${PORT}` );
} )