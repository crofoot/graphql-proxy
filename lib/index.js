"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require("express-graphql");

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require("./schema/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 4000;
var app = (0, _express2.default)();
var promiseSchema = (0, _schema.buildAsyncSchema)();

app.use('/graphql', (0, _expressGraphql2.default)(async function (req) {
    return {
        schema: await promiseSchema,
        graphiql: true,
        context: req
    };
}));

app.listen(PORT, function () {
    console.log("GraphQL Server Started at " + new Date());
    console.log("GraphQL Server Running http://127.0.0.1:" + PORT + "/graphql");
});