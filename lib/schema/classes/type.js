"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Type = exports.Type = function () {
    function Type(name, get, post, templateUrl, queries, mutations) {
        _classCallCheck(this, Type);

        this.name = name;
        this.get = get;
        this.post = post;
        this.templateUrl = templateUrl;
        this.queries = queries;
        this.mutations = mutations;
    }

    _createClass(Type, [{
        key: "create",
        value: function create(type) {
            this.name = type.name;
            this.get = type.get;
            this.post = type.post;
            this.templateUrl = type.templateUrl;
            this.queries = type.queries;
            this.mutations = type.mutations;
        }
    }]);

    return Type;
}();