const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('../data/models');

const PORT = 4000;

// const mocks = {
//   Query: () => ({
//     getAllUsers: () => [...new Array(6)]
//   }),
//   User: () => ({
//     id: () => 'u_01',
//     name: () => 'Roohan',
//     superUser: () => true,
//     password: () => '123456'
//   })
// };

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: { models },
});
server.listen(PORT).then(async () => {
  console.clear(); 
  console.log(`
    🚀 Server is running on ${PORT}
    🎉 Query at http://localhost:${PORT}
  `)
  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established');
  } catch(err) {
    console.error('Unable to connect to database: ', error)
  }
})