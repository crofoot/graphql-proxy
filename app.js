const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { corsOptions } = require('./config/cors');
const { buildSchemaAsync } = require('./schema');


const configurationList = [
    {
        name: 'Posts',
        templateUrl: 'https://jsonplaceholder.typicode.com/posts/1',
        get: {
            url: 'https://jsonplaceholder.typicode.com/posts/{id}',
            queryByProperty: 'id',
            query: {
                name: 'post',
                args: {
                    id: 'Int!',
                }
            },
        },
        post: {
            name: 'updatePost',
            queryByProperty: 'id',
            url: 'https://jsonplaceholder.typicode.com/posts/',
        },
        getList: {
            url: 'https://jsonplaceholder.typicode.com/posts/',
            queryByProperty: 'id',
            query: {
                name: 'posts',
                args: {}
            }
        },
        postList: {}
    }
];

// express server setup
const DOMAIN = 'http://127.0.0.1';
const PORT = 4000;
const app = express();
buildSchemaAsync(configurationList); // initial build of schema

// middleware 
app.use(bodyParser.json()); // support json post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors(corsOptions)) // allow all for cors filter for now

app.use('/graphql', graphqlHTTP(async req => ({
    schema: await global.schema,
    graphiql: true,
    context: req
}))
);

app.listen(PORT, () => {
    console.log(`GraphQL Server Started at ${new Date()}`)
    console.log(`GraphQL Server Running ${DOMAIN}:${PORT}/graphql`)
});



