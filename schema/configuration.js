var Configuration = function (name, get, post, getList, postList, templateUrl) {
    this.name = name;
    this.get = get;
    this.post = post;
    this.getList = getList;
    this.postList = postList;
    this.templateUrl = templateUrl;
}

exports.Configuration = Configuration;