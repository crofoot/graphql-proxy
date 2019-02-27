# graphql-proxy
GraphQL layer/proxy for querying existing REST apis.


### About
graphql-proxy allows you to build a GraphQL layer on top of your existing REST api without modifing it, with minimal configuration.

### Scripts

` npm start ` starts server up with nodemon

### How to use 

The current way to use graphql-proxy is to create a configuration object like the following. If you don't support lists (getList, postList) you can just pass empty an object.

``` javascript
config =   {
        name : String,
        templateUrl: String,
        get : {
            url : String,
            query : {
                name: String,
                queryByProperty : String,
                args: Object
            },
        },
        post : {
            name: String,
            queryByProperty : String,
            url : String,
        },
        getList : {
            url : String,
            queryByProperty : String,
            query : {
                name : String,
                args : Object
            }
        },
        postList : {
            name : String,
            queryByProperty : String,
            url : String
        }
    }
```


Here is a sample one using "jsonplaceholder"
``` javascript
config = {
        name : 'Posts',
        templateUrl: 'https://jsonplaceholder.typicode.com/posts/1',
        get : {
            url : 'https://jsonplaceholder.typicode.com/posts/{id}',
            query : {
                name: 'post',
                queryByProperty : 'id',
                args: {
                    id: 'Int!',
                }
            },
        },
        post : {
            name: 'updatePost',
            queryByProperty : 'id',
            url : 'https://jsonplaceholder.typicode.com/posts/',
        },
        getList : {
            url : 'https://jsonplaceholder.typicode.com/posts/',
            queryByProperty : 'id',
            query : {
                name : 'posts',
                args : {}
            }
        },
        postList : {}
    }
```





