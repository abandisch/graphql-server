require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { PRISMA_JWT_SECRET, PRISMA_ENDPOINT, PORT } = require('./config')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/database/generated/prisma.graphql',
      endpoint: PRISMA_ENDPOINT,
      secret: PRISMA_JWT_SECRET,
      debug: true,
    })
  })
})

server.start({ port: PORT }, ({ port }) => console.log(`Server is running on http://localhost:${port}`))