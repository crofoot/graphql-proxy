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
