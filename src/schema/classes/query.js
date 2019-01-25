/* @flow */
export class Query {
    constructor(name: ?String, args: ?Object) {
        this.name = name;
        this.args = args;
    }
}