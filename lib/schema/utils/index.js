'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// builds up object recursively
var build = exports.build = function build(object, data) {

    for (var property in data) {
        if (_typeof(object[property]) === 'object') {
            object[property] = build(object[property], data[property]);
        } else {
            object[property] = data[property];
        }
    }
    return object;
};