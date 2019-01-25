/* @flow */
import Axios from "axios";
import { printSchema } from "graphql";
import { composeWithJson } from "graphql-compose-json";
import { schemaComposer, TypeComposer, toInputObjectType } from "graphql-compose";
import { Type, Mutation, Query } from "./classes";
import { build, decodeRegexUrl } from "./schema.utils";

export var schema; // (important) your graphQL Schema

// creates a type composer for graphql-compose
const createTypeComposer = async (type: ?Type): TypeComposer => {

    const { data } = await Axios.get(type.templateUrl); // gets a template object to create a GraphQL Type

    let graphQLType = composeWithJson(type.name, data); // creates the model type 
    let graphQLInputType = toInputObjectType(graphQLType); // creates the input model type
    graphQLType = createQueries(type.queries, graphQLType, type); // builds Queries on type
    graphQLType = createMutations(type.mutations, graphQLType, graphQLInputType, type); // builds Mutations on type

    return graphQLType;
}


// creates mutations from config object
const createMutations = (mutations: ?Array<Mutation>, typeComposer: ?TypeComposer, inputTypeComposer: ?InputTypeComposer, type: ?Type): TypeComposer => {

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


//creates queries from config object
const createQueries = (queries: ?Array<Query>, typeComposer: ?TypeComposer, type: ?Type): TypeComposer => {

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


// initial build of schema
export const buildAsyncSchema = async (configuration: ?Array<Type>): GraphQLSchema => {

    try {
        for (let i = 0; i < configuration.length; i++) {
            const type = new Type();
            type.create(configuration[i]);
            const typeComposer = await createTypeComposer(type);
    
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
        }
    
        schema = schemaComposer.buildSchema();

        return true;

    } catch (e) {
        return false;
    }
  
    

}


// CRUD functions for updating schema through endpoints


// add type to schema
export const createType = async (config: ?Type) => {

    const type = new Type();

    try {

        type.create(config);
        const typeComposer = await createTypeComposer(type);

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

        schema = schemaComposer.buildSchema();

        return true;

    } catch (e) {
        return false;
    }

}


// reads a type from the schema
export const readType = (type: ?String) => {
}


// updates a type in the schema
export const updateType = (type: ?String) => {
}


// delete type from schema
export const deleteType = (type: ?String) => {
}


export const getSchema = () => {
}
