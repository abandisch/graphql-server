# GraphQL Node Server Tutorial

Following tutorial outlined in https://www.howtographql.com

## Stack

* Node
* graphql-yoga
* Prisma

## Required files

Before starting the project, the following two files need to be created locally

* `src/database/prisma.yml` - add the following:
  ```
  # HTTP endpoint for the Prisma API
  endpoint: ''

  # File that holds the data model
  datamodel: datamodel.graphql

  # JWT secret to access API with
  secret: yourjwtsecret

  # Deploy hook
  hooks:
    post-deploy:
      - graphql get-schema --project database
  ```
  
  Replace `yourjwtsecret` with the value held in `PRISMA_JWT_SECRET` the `.env` file (see below second point)
  
  To generate the string for the endpoint, first ensure `prisma` is installed (`npm install -g prisma`), and the GraphQL ClI is installed globally (`npm install -g graphql-cli`), then run `prisma deploy`. Select the demo server and the default values for service and stage. Once complete, the process will automatically add the `endpoint` to the `prisma.yml`

* `.env` - create this in the root directory of the project and put the following inside and provide values for each:

  ```
   APP_JWT_SECRET=""
   PRISMA_JWT_SECRET=""
   PRISMA_ENDPOINT=""
  ```
  
  `APP_JWT_SECRET` and `PRISMA_JWT_SECRET` can just be anything. To get the value for `PRISMA_ENDPOINT`, see above. 
  e.g. 
  
  ```
   APP_JWT_SECRET="mysecretapppass"
   PRISMA_JWT_SECRET="mysecretjwtpass"
   PRISMA_ENDPOINT="https://us1.prisma.sh/.../hackernews-clone-tute/dev"
  ```

## Start the server

To start in dev mode, type in `yarn run start:dev` (ensure `nodemon` is installed globally), otherwise just run `yarn start`

## Start up the GraphQL Playground

Ensure the GraphQL CLI is installed globally (`npm install -g graphql-cli`), start the server `yarn start`, then run `graphql playground`
