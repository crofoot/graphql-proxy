const axios = require('axios');
const { printSchema } = require('graphql');
const { Configuration } = require('./configuration');
const { composeWithJson } = require('graphql-compose-json');
const { build, decodeRegexUrl } = require('./schema.utils');
const { schemaComposer, TypeComposer, toInputObjectType } = require('graphql-compose');

// var schema = schemaComposer; // (IMPORTANT) this your GraphQL schema

configurationToSchema = async (configuration) => {

    const { data } = await axios.get(configuration.templateUrl); // gets a template object to create a GraphQL Type
    let graphQLType = composeWithJson(configuration.name, data); // creates the model type 
    let graphQLInputType = toInputObjectType(graphQLType); // creates the input model type
    let mutations = {};
    let queries = {};

    // Adding 'get' resolver 
    graphQLType.addResolver({
        name: configuration.get.query.name,
        type: graphQLType,
        args: configuration.get.query.args,
        resolve: async ({ args }) => {
            try {
                const { data } = await axios.get(decodeRegexUrl(configuration.get.url, args[configuration.get.queryByProperty]))
                console.log(data)
                return data;
            } catch (e) {
                console.log(`Cannot reach ${type.get}`);
                return null;
            }
        }
    });

    // Adding 'post' resolver
    graphQLType.addResolver({
        name: configuration.post.name,
        type: graphQLType,
        args: {
            input: { type: graphQLInputType }
        },
        resolve: async ({ args }) => {
            try {
                const { data } = await axios.get(decodeRegexUrl(configuration.post.url, args.input[configuration.post.queryByProperty]))
                const newData = build(data, args.input);
                const response = await Axios.post(configuration.post, newData);
                return newData
            } catch (e) {
                console.log(e)
                console.log(`Cannot reach ${type.get} or ${type.post}`)
            }
        }
    });

    // Adding 'getList' resolver
    if(configuration.getList !== {}){
        graphQLType.addResolver({
            name: configuration.getList.query.name,
            type: [graphQLType],
            args: configuration.getList.query.args,
            resolve: async ({ args }) => {
                try {
                    const { data } = await axios.get(decodeRegexUrl(configuration.getList.url, args[configuration.getList.queryByProperty]))
                    console.log(data)
                    return data;
                } catch (e) {
                    console.log(`Cannot reach ${type.get}`);
                    return null;
                }
            }
        });
    }

    // TODO : postList Resolver

    queries[configuration.get.query.name] = graphQLType.getResolver(configuration.get.query.name);

    if(configuration.getList !== {})
        queries[configuration.getList.query.name] = graphQLType.getResolver(configuration.getList.query.name);

    mutations[configuration.post.name] = graphQLType.getResolver(configuration.post.name);

    schemaComposer.Query.addFields(queries);
    schemaComposer.Mutation.addFields(mutations);

}


buildSchemaAsync = async (configurationList) => {

    for (let i = 0; i < configurationList.length; i++) {
        try {
            const configuration = new Configuration(configurationList[i].name, configurationList[i].get, configurationList[i].post,
            configurationList[i].getList, configurationList[i].postList, configurationList[i].templateUrl);
                
            await configurationToSchema(configuration);
        } catch (e) {
            // console.log(e)
            console.error(`ERROR: Unable to create schema for ${configurationList[i].name}`)
        }
    }

    global.schema = schemaComposer.buildSchema();
}


module.exports = {buildSchemaAsync};