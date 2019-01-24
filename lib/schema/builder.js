"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createType = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _graphqlComposeJson = require("graphql-compose-json");

var _graphqlCompose = require("graphql-compose");

var _classes = require("./classes");

var _schema = require("./schema.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createType = exports.createType = async function createType(type) {
    var _ref = await _axios2.default.get(type.templateUrl),
        data = _ref.data; // gets a template object to create a GraphQL Type

    var graphQLType = (0, _graphqlComposeJson.composeWithJson)(type.name, data); // creates the model type 
    var graphQLInputType = (0, _graphqlCompose.toInputObjectType)(graphQLType); // creates the input model type
    graphQLType = createQueries(type.queries, graphQLType, type); // builds Queries on type
    graphQLType = createMutations(type.mutations, graphQLType, graphQLInputType, type); // builds Mutations on type

    return graphQLType;
};


var createMutations = function createMutations(mutations, typeComposer, inputTypeComposer, type) {

    mutations.forEach(function (mutation) {
        typeComposer.addResolver({
            name: mutation.name,
            type: typeComposer,
            args: {
                input: { type: inputTypeComposer }
            },
            resolve: async function resolve(rp) {
                var _ref2 = await _axios2.default.get((0, _schema.decodeRegexUrl)(type.get, rp.args.input.id)),
                    data = _ref2.data;

                return (0, _schema.build)(data, rp.args.input);
            }
        });
    });

    return typeComposer;
};

var createQueries = function createQueries(queries, typeComposer, type) {

    queries.forEach(function (query) {
        typeComposer.addResolver({
            name: query.name,
            type: typeComposer,
            args: query.args,
            resolve: async function resolve(rp) {
                var _ref3 = await _axios2.default.get((0, _schema.decodeRegexUrl)(type.get, rp.args.id)),
                    data = _ref3.data;

                return data;
            }
        });
    });

    return typeComposer;
};

var testConfig = {
    name: 'Posts',
    get: 'https://jsonplaceholder.typicode.com/posts/{id}',
    post: 'https://jsonplaceholder.typicode.com/posts/',
    templateUrl: 'https://jsonplaceholder.typicode.com/posts/1',
    queries: [{
        name: 'getPost',
        args: {
            id: 'Int!'
        }
    }],
    mutations: [{
        name: 'updatePost',
        args: {}
    }]
};

exports.default = async function () {

    var type = new _classes.Type();
    type.create(testConfig);
    var typeComposer = await createType(type);

    type.mutations.forEach(function (mutation) {
        var obj = {};
        obj[mutation.name] = typeComposer.getResolver(mutation.name);
        _graphqlCompose.schemaComposer.Mutation.addFields(obj);
    });

    type.queries.forEach(function (query) {
        var obj = {};
        obj[query.name] = typeComposer.getResolver(query.name);
        _graphqlCompose.schemaComposer.Query.addFields(obj);
    });

    var schema = _graphqlCompose.schemaComposer.buildSchema();
    return schema;
};