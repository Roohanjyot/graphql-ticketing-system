const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    async getAllUsers(_, __, { models }) {
      const users = models.User.findAll();
      return users;
    },
    async getUser(_, { id }, { models }) {
      const user = models.User.findByPk(id);
      return user;
    }
  },
  Mutation: {
    async setUser(_, { name, superUser, password }, { models }) {
      try {
        // console.log(models.Users)
        const user = await models.User.create({
          name,
          superUser,
          password: await bcrypt.hash(password, 10),
        });
        return {
          code: 200,
          success: true,
          message: `Successfully created a user: ${name}`,
          user,
        };
      } catch (err) {
        return {
          code: 404,
          success: false,
          message: `Error creating the user: ${err}`,
          user: null,
        }
      }
    },
    async setTicket(_, { 
      assignee, 
      assigned, 
      progressTracker, 
      title, 
      body, 
      points, 
      dateCreated, 
      estimatedHours, 
      actualHours, 
      parent
    }, { models }) {
      try {
        const ticket = await models.Ticket.create({
          assignee,
          progressTracker,
          title,
          body,
          points,
          dateCreated,
          estimatedHours,
          actualHours,
          parent,
        });
        assigned.forEach( async (assignedIdStr) => {
          const assignedId = Number(assignedIdStr);
          await models.UserTickets.create({
            userId: assignedId,
            ticketId: ticket.dataValues.id,
          })
        });
        return {
          code: 200, 
          success: true,
          message: `Successfully created a table: ${title}`,
          ticket,
        }
      } catch(err) {
        return {
          code: 404,
          success: false,
          message: `Error creating the table: ${title}`,
          ticket: null
        }
      }
    },
    deleteUser(_, { id }, { models }) {
      try {
        models.User.destroy({
          where: {
            id
          }
        });
        models.UserTickets.destroy({
          where: {
            userId: id
          }
        });
        models.Ticket.destroy({
          where: {
            assignee: id
          }
        });
        return {
          code: 200,
          success: true,
          message: `Deleted the user at ${ id }`,
        }
      } catch(err) {
        return {
          code: 404,
          success: false,
          message: `Couldn't delete the user at ${ id }: ${err}`,
        }
      }
    },
    deleteTicket(_, { id }, { models }) {
      try {
        models.Ticket.destroy({ where: { id } })
        models.UserTickets.destroy({
          where: {
            ticketId: id
          }
        });
        return {
          code: 200,
          success: true,
          message: `Deleted the ticket at ${ id }`,
        }
      } catch(err) {
        return {
          code: 404,
          success: false,
          message: `Couldn't delete the ticket at ${ id }: ${err}`,
        }
      }
    },
  },
  Ticket: {
    assignee: ({ assignee } , _, { models }) => {
      return models.User.findByPk(assignee);
    },
    parent: ({ parent }, _, { models }) => {
      return models.Ticket.findByPk(parent);
    },
    assigned: (_, __, { models }, { variableValues }) => {
      const memberIds = variableValues.assigned.map(memberIdStr => Number(memberIdStr));
      console.log("are of member ids", memberIds)
      return models.User.findAll({
        where: {
          id: memberIds
        }
      })
    }
  }
};

module.exports = resolvers;