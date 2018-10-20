const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]

const getLink = (id) => links.find(lnk => lnk.id === id)

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,
    feed: () => links,
    link: (root, args) => getLink(args.id)
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${++links.length}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },

    updateLink: (root, args) => {
      const l = getLink(args.id)
      if (l) {
        const lnks = links.map(lnk => {
          if (lnk.id === l.id) {
            if (args.url) lnk.url = args.url
            if (args.description) lnk.description = args.description
          }
          return lnk
        })
        links = lnks
        return getLink(l.id)
      }
      return null
    },

    deleteLink: (root, args) => {
      const index = links.findIndex(lnk => lnk.id === args.id)
      if (index < 0) return null
      const link = links[index]
      links.splice(index, 1)
      return link
    }
  },

  // Link resolver is not needed, because it's so simple graphql can infer the resolvers for each field
  // Link: {
  //   id: (root) => root.id,
  //   description: (root) => root.description,
  //   url: (root) => root.url
  // }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))