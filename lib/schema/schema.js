"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteType = exports.updateType = exports.readType = exports.createType = exports.buildAsyncSchema = exports.schema = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _graphql = require("graphql");

var _graphqlComposeJson = require("graphql-compose-json");

var _graphqlCompose = require("graphql-compose");

var _classes = require("./classes");

var _schema = require("./schema.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = undefined; // (important) your graphQL Schema

// creates a type composer for graphql-compose
var createTypeComposer = async function createTypeComposer(type) {
    var _ref = await _axios2.default.get(type.templateUrl),
        data = _ref.data; // gets a template object to create a GraphQL Type

    var graphQLType = (0, _graphqlComposeJson.composeWithJson)(type.name, data); // creates the model type 
    var graphQLInputType = (0, _graphqlCompose.toInputObjectType)(graphQLType); // creates the input model type
    graphQLType = createQueries(type.queries, graphQLType, type); // builds Queries on type
    graphQLType = createMutations(type.mutations, graphQLType, graphQLInputType, type); // builds Mutations on type

    return graphQLType;
};

// creates mutations from config object
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

//creates queries from config object
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

// initial build of schema
var buildAsyncSchema = exports.buildAsyncSchema = async function buildAsyncSchema(configuration) {

    try {
        var _loop = async function _loop(i) {
            var type = new _classes.Type();
            type.create(configuration[i]);
            var typeComposer = await createTypeComposer(type);

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
        };

        for (var i = 0; i < configuration.length; i++) {
            await _loop(i);
        }

        exports.schema = schema = _graphqlCompose.schemaComposer.buildSchema();

        return true;
    } catch (e) {
        return false;
    }
};

// CRUD functions for updating schema through endpoints


// add type to schema
var createType = exports.createType = async function createType(config) {

    var type = new _classes.Type();

    try {

        type.create(config);
        var _typeComposer = await createTypeComposer(type);

        type.mutations.forEach(function (mutation) {
            var obj = {};
            obj[mutation.name] = _typeComposer.getResolver(mutation.name);
            _graphqlCompose.schemaComposer.Mutation.addFields(obj);
        });

        type.queries.forEach(function (query) {
            var obj = {};
            obj[query.name] = _typeComposer.getResolver(query.name);
            _graphqlCompose.schemaComposer.Query.addFields(obj);
        });

        exports.schema = schema = _graphqlCompose.schemaComposer.buildSchema();

        return true;
    } catch (e) {
        return false;
    }
};

// reads a type from the schema
var readType = exports.readType = function readType(type) {
    try {
        return _graphqlCompose.schemaComposer.get(type).getFieldNames();
    } catch (e) {
        console.log(e);
        return null;
    }
};

// updates a type in the schema
var updateType = exports.updateType = function updateType(type) {};

// delete type from schema
var deleteType = exports.deleteType = function deleteType(type) {
    try {
        var isDeleted = _graphqlCompose.schemaComposer.delete(type);
        if (isDeleted) {
            exports.schema = schema = _graphqlCompose.schemaComposer.buildSchema();
        }
        return isDeleted;
    } catch (e) {
        console.log(e);
        return null;
    }
};