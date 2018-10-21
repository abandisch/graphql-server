/* Subscription Resolvers */

const newLinkSubscribe = (root, args, context, info) => {
  return context.db.subscription.link({
    where: {
      mutation_in: ['CREATED']
    }
  }, info)
}

const newLink = {
  subscribe: newLinkSubscribe
}

module.exports = { newLink }
