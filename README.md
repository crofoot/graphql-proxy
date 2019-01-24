# graphql-proxy
GraphQL layer/proxy for querying existing REST apis.


### About
graphql-proxy allows you to build a GraphQL layer on top of your exisiting REST api without modifing it, with minimal configuration.

### How to use 

The current way to use graphql-proxy is to create a configuration object like the following and pass it to the create method to the Type class in the builder.js file.

``` javascript
config = {
    name : 'String' // GraphQL object name
    get: 'String', // get URL for fetching data
    post: 'String', // post URL for updating data
    templateUrl: 'String', // URL to template object
    queries: [
        {
            name: 'String', // query function name
            args: { } // arguments passed to query
        }
    ],
    mutations: [
        {
            name: 'String', // mutation function name
            args: { } // arguments passed to querying 
        }
    ] 
} 
```


Here is a sample one using "jsonplaceholder"
``` javascript
config = {
    name : 'Posts',
    get: 'https://jsonplaceholder.typicode.com/posts/{id}',
    post: 'https://jsonplaceholder.typicode.com/posts/',
    templateUrl: 'https://jsonplaceholder.typicode.com/posts/1',
    queries: [
        {
            name: 'getPost',
            args: {
                id: 'Int!',
            }
        }
    ],
    mutations: [
        {
            name: 'updatePost',
            args: { }
        }
    ] 
} 
```





