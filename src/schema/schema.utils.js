/* @flow */

// builds up object recursively
export const build = (object, data) => {

    for (var property in data) {
        if (typeof object[property] === 'object') {
            object[property] = build(object[property], data[property])
        } else {
            object[property] = data[property]
        }
    }
    return object
}

export const decodeRegexUrl = (url: ? String, id) => {
    // console.log(url.replace(/{.*}/g, id));
    return url.replace(/{.*}/g, id);
} 