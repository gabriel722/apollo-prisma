const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_CODE } = require('../utils')

async function signup(parent, args, context) {
  console.log('signup requested')
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, SECRET_CODE)

  return {
    token,
    user,
  }
}

async function login(parent, args, context) {
  console.log('login requested')
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, SECRET_CODE),
    user,
  }
}

module.exports = {
  signup,
  login,
}
