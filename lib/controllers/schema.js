'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _schema = require('../schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// create type
router.post('/', function (req, res) {
    (0, _schema.createType)(req.body.data).then(function (isAdded) {
        if (isAdded) {
            res.status(200).send({ status: 'ok' });
        } else {
            res.status(500).send({ status: 'error' });
        }
    });
});

// get whole schema
router.get('/', function (req, res) {});

// get type
router.get('/:type', function (req, res) {
    console.log(req.params.type);
    res.status(200).send({ status: 'ok' });
});

// update type 
router.get('/', function (req, res) {});

exports.default = router;