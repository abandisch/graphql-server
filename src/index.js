require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { JWT_SECRET, PRISMA_ENDPOINT } = require('./config')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,

    // root - parent
    // args - arguments provided by the query/mutation
    // context - every resolver has access to this. it's a means of resolvers to talk to eachother or to pass data/functions to the resolver
    // info - the payload/selection set
    feed: () => (root, args, context, info) => {
      // {} - this contains any paramaters to send to Prisma with the query
      // info - payload/selection set
      return context.db.query.links({}, info)
    }
  },

  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description
        }
      }, info)
    },

  },

}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/database/generated/prisma.graphql',
      endpoint: PRISMA_ENDPOINT,
      secret: JWT_SECRET,
      debug: true,
    })
  })
})

server.start(() => console.log('Server is running on http://localhost:4000'))