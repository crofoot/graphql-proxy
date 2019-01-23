import express from "express";
import expressGraphQL from "express-graphql";
import { buildAsyncSchema } from "./schema";


const PORT = 4000;
const app = express();
const promiseSchema = buildAsyncSchema();

app.use('/graphql', expressGraphQL(async req => ({
    schema: await promiseSchema,
    graphiql: true,
    context: req
}))
);

app.listen(PORT, () => {
    console.log(`GraphQL Server Running http://127.0.0.1:${PORT}/graphql`)
})