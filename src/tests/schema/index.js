/* @flow */
export const test_config = [
    {
        name: 'Posts',
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
                args: {

                }
            }
        ]
    },
    {
        name: 'Cases',
        get: 'https://jsonplaceholder.typicode.com/posts/{id}',
        post: 'https://jsonplaceholder.typicode.com/posts/',
        templateUrl: 'https://jsonplaceholder.typicode.com/posts/1',
        queries: [
            {
                name: 'getCases',
                args: {
                    id: 'Int!',
                }
            }
        ],
        mutations: [
            {
                name: 'updateCases',
                args: {

                }
            }
        ]
    }
]