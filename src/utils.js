const jwt = require('jsonwebtoken')
const { APP_JWT_SECRET } = require('./config')

const getUserId = context => {
  const Authorization = context.request.get('Authorization')
  if (!Authorization) throw new Error ('Not authenticated')

  const token = Authorization.replace('Bearer ', '')
  const { userId } = jwt.verify(token, APP_JWT_SECRET)
  return userId
}

module.exports = { getUserId }
