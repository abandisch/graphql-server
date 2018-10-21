/* Mutation Resolvers */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { getUserId } = require('../utils')
const { APP_JWT_SECRET } = require('../config')

const signWithJwt = (item) => jwt.sign(item, APP_JWT_SECRET)

async function signup (root, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.db.mutation.createUser({
    data: { ...args, password }
  })

  const token = signWithJwt({ userId: user.id })

  return {
    token,
    user
  }
}

async function login (root, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, '{ id password }')
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) throw new Error('Invalid password')

  const token = signWithJwt({ userId: user.id })

  return {
    token,
    user
  }
}

const post = (root, args, context, info) => {
  const userId = getUserId(context)
  return context.db.mutation.createLink({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  }, info)
}

module.exports = {
  signup,
  login,
  post,
}
