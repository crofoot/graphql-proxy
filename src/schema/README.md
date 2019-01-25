## How schema.js works

The schema.js does the bulk of the work load for creating and modifying the GraphQL schema.

To start, there is a variable : ` export var schema `
This is your GraphQL schema object. 

I recommend you look at the ` /classes ` directory to understand the class structures that are used.


#### createTypeComposer()
This is used to create a GraphQL Type

#### createMutations()
This is used by `createTypeComposer()` to create mutations for a specific type.

#### createQueries()
This is used by `createTypeComposer()` to create queries for a specific type.

#### buildAsyncSchema() 
(Updates schema)
This is used to initial load the configurations and build the schema 

#### createType()
(Updates schema)
This allows you to update the schema with a new configuration object.

### CRUD functions used for modifying schema
(Need to add docs)


