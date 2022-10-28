const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query{
    getAllUsers: [User!]!
    getUser(id: ID!): User
    getAllTickets: [Ticket!]!
    getTicket(id: ID!): Ticket
  },
  type User {
    id: ID!
    name: String!
    superUser: Boolean!
    password: String!
  },
  type Ticket {
    id: ID!
    assignee: User!
    assigned: [User!]!
    points: Int
    dateCreated: String
    estimatedHours: Int
    actualHours: Int
    parent: Ticket
    progressTracker: ProgressTrackerType!
    title: String!
    body: String
  },
  type Mutation {
    setUser(
      name: String!, 
      superUser: Boolean!, 
      password: String!
    ): setUserResponse!
    setTicket(
      assignee: ID!, 
      assigned: [ID!]!, 
      progressTracker: ProgressTrackerType!, 
      title: String!, 
      body: String,
      points: Int,
      dateCreated: String,
      estimatedHours: Int,
      actualHours: Int,
      parent: ID,
    ): setTicketResponse!
    deleteUser(id: ID!): deleteUserResponse!
    deleteTicket(id: ID!): deleteTicketResponse!
  }
  enum ProgressTrackerType {
    TODO
    IN PROGRESS
    COMPLETED
  },
  type setUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }
  type setTicketResponse {
    code: Int!
    success: Boolean!
    message: String!
    ticket: Ticket
  }
  type deleteUserResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
  type deleteTicketResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
`;

module.exports = typeDefs;