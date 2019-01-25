/* @flow */
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { schema, buildAsyncSchema } from "./schema";
import { test_config } from "./tests/schema";
import expressGraphQL from "express-graphql";
import schemaRoutes from "./controllers/schema";

// express server setup
const PORT = 4000;
const app = express();

// initial build
buildAsyncSchema(test_config); // current schema at runtime 

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use(bodyParser.json()); // support json post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/schema', schemaRoutes); // schema routes for modifying schema
app.options('*', cors(corsOption)) // allow all for cors filter for now


// route for querying graphQL
app.use('/graphql', expressGraphQL(async req => ({
    schema: await schema,
    graphiql: true,
    context: req
}))
);

app.listen(PORT, () => {
    console.log(`GraphQL Server Started at ${new Date()}`)
    console.log(`GraphQL Server Running http://127.0.0.1:${PORT}/graphql`)
})
