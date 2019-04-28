const jwt = require('jsonwebtoken')
const SECRET_CODE = 'Text-for-Test'

function getUserId(context) {

  console.log('getUserId called')
  const Authorization = context.request.get('authorization')

  if (Authorization) {
    console.log('Authorization')
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, SECRET_CODE)

    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  SECRET_CODE,
  getUserId
}
