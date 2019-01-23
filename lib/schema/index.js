"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildAsyncSchema = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _utils = require("./utils");

var _graphqlComposeJson = require("graphql-compose-json");

var _graphqlCompose = require("graphql-compose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = 'http://localhost:8080/CaseManager/rest/CMMobile/Test/getCaseById';

var buildAsyncSchema = exports.buildAsyncSchema = async function buildAsyncSchema() {
    var url = baseUrl + "/200";
    var jsonData = await _axios2.default.get(url);
    var CaseType = (0, _graphqlComposeJson.composeWithJson)('Case', jsonData.data);
    var CaseTypeInput = (0, _graphqlCompose.toInputObjectType)(CaseType);

    // Query Methods
    CaseType.addResolver({
        name: 'findById',
        type: CaseType,
        args: {
            id: 'Int!'
        },
        resolve: async function resolve(rp) {
            var response = await _axios2.default.get(baseUrl + "/" + rp.args.id);
            return response.data;
        }
    });

    // Mutation Methods
    CaseType.addResolver({
        name: 'updateById',
        type: CaseType,
        args: {
            input: { type: CaseTypeInput }
        },
        resolve: async function resolve(rp) {
            var response = await _axios2.default.get(baseUrl + "/" + rp.args.input.id);
            var input = rp.args.input;
            var data = (0, _utils.build)(response.data, input);
            return data;
        }
    });

    _graphqlCompose.schemaComposer.Query.addFields({
        case: CaseType.getResolver('findById')
    });

    _graphqlCompose.schemaComposer.Mutation.addFields({
        updateCase: CaseType.getResolver('updateById')
    });

    var schema = _graphqlCompose.schemaComposer.buildSchema();
    //console.log(printSchema(schema))
    return schema;
};