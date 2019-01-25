"use strict";

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require("./schema");

var _schema2 = require("./tests/schema");

var _expressGraphql = require("express-graphql");

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema3 = require("./controllers/schema");

var _schema4 = _interopRequireDefault(_schema3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// express server setup
var PORT = 4000;

var app = (0, _express2.default)();

// initial build
(0, _schema.buildAsyncSchema)(_schema2.test_config); // current schema at runtime 

var corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use(_bodyParser2.default.json()); // support json post requests
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/schema', _schema4.default); // schema routes for modifying schema
app.options('*', (0, _cors2.default)(corsOption)); // allow all for cors filter for now


// route for querying graphQL
app.use('/graphql', (0, _expressGraphql2.default)(async function (req) {
    return {
        schema: await _schema.schema,
        graphiql: true,
        context: req
    };
}));

app.listen(PORT, function () {
    console.log("GraphQL Server Started at " + new Date());
    console.log("GraphQL Server Running http://127.0.0.1:" + PORT + "/graphql");
});