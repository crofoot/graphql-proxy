
// builds up object recursively
exports.build = (object, data) => {

    for (var property in data) {
        if (typeof object[property] === 'object') {
            object[property] = build(object[property], data[property])
        } else {
            object[property] = data[property]
        }
    }
    return object
}

exports.decodeRegexUrl = (url, id) => url.replace(/{.*}/g, id);