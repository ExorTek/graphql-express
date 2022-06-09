const express = require('express');
const app = express();
require('dotenv').config({
    path: './config/config.env'
})
const {PORT} = process.env;
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['event 1', 'event 2'];
        },
        createEvent: (args) => {
            return args.name
        },
    },
    graphiql: true
}))
app.use(bodyParser.json());


app.listen(PORT || 5001, () => {
    console.log(`Server is running on port ${PORT} -> http://localhost:${PORT}`);
})