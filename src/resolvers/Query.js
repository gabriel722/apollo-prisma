const { getUserId } = require('../utils')

function info(){
  return "informations"
}

async function loginCheck(parent, arg, context){

  console.log('loginCheck requested')
  const userId = getUserId(context)
  const user = context.prisma.user({id: userId})

  return user
}

module.exports = {
  info,
  loginCheck
}
