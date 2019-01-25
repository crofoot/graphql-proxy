/* @flow */
export class Type {
    constructor(name: ?String, get: ?String, post: ?String, templateUrl: ?String, queries: ?Array<Query>, mutations: ?Array<Mutation>) {
        this.name = name;
        this.get = get;
        this.post = post;
        this.templateUrl = templateUrl;
        this.queries = queries;
        this.mutations = mutations;
    }

    create(type: ?Type){
        this.name = type.name;
        this.get = type.get;
        this.post = type.post;
        this.templateUrl = type.templateUrl;
        this.queries = type.queries;
        this.mutations = type.mutations;
    }
}