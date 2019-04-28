const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  Subscription
}
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions:'/subscriptions',
  playground:'/playground'
}
server.start(options, ({port}) =>
    console.log(`Server started, listening on port ${port} for incoming requests.`)
)

//server.start(() => console.log(`Server is running on http://localhost:4000`))