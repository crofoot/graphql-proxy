/* @flow */
import Axios from "axios";
import { composeWithJson } from "graphql-compose-json";
import { schemaComposer, TypeComposer, toInputObjectType } from "graphql-compose";
import { Type, Mutation, Query } from "./classes";
import { build, decodeRegexUrl } from "./schema.utils";

export const createType = async (type: ?Type): TypeComposer => {

    const { data } = await Axios.get(type.templateUrl); // gets a template object to create a GraphQL Type

    let graphQLType = composeWithJson(type.name, data); // creates the model type 
    let graphQLInputType = toInputObjectType(graphQLType); // creates the input model type
    graphQLType = createQueries(type.queries, graphQLType, type); // builds Queries on type
    graphQLType = createMutations(type.mutations, graphQLType, graphQLInputType, type); // builds Mutations on type

    return graphQLType;
}


const createMutations = (mutations: ?Array<Mutation>,
    typeComposer: ?TypeComposer,
    inputTypeComposer: ?InputTypeComposer,
    type: ?Type): TypeComposer => {

    mutations.forEach(mutation => {
        typeComposer.addResolver({
            name: mutation.name,
            type: typeComposer,
            args: {
                input: { type: inputTypeComposer }
            },
            resolve: async (rp) => {
                const { data } = await Axios.get(decodeRegexUrl(type.get, rp.args.input.id))
                return build(data, rp.args.input);
            }
        })
    });

    return typeComposer;
}


const createQueries = (queries: ?Array<Query>,
    typeComposer: ?TypeComposer,
    type: ?Type): TypeComposer => {

    queries.forEach(query => {
        typeComposer.addResolver({
            name: query.name,
            type: typeComposer,
            args: query.args,
            resolve: async (rp) => {
                const { data } = await Axios.get(decodeRegexUrl(type.get, rp.args.id))
                return data;
            }
        })

    });

    return typeComposer;
}


const testConfig = {
    name : 'Posts',
    get: 'https://jsonplaceholder.typicode.com/posts/{id}',
    post: 'https://jsonplaceholder.typicode.com/posts/',
    templateUrl: 'https://jsonplaceholder.typicode.com/posts/1',
    queries: [
        {
            name: 'getPost',
            args: {
                id: 'Int!',
            }
        }
    ],
    mutations: [
        {
            name: 'updatePost',
            args: {

            }
        }
    ]
}

export default async () => {

    const type = new Type();
    type.create(testConfig);
    const typeComposer = await createType(type);

    type.mutations.forEach(mutation => {
        let obj = {};
        obj[mutation.name] = typeComposer.getResolver(mutation.name);
        schemaComposer.Mutation.addFields(obj);
    });

    type.queries.forEach(query => {
        let obj = {};
        obj[query.name] = typeComposer.getResolver(query.name);
        schemaComposer.Query.addFields(obj);
    });

    const schema = schemaComposer.buildSchema();
    return schema;
}


