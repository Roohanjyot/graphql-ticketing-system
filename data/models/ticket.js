'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsToMany(models.User, {through: models.UserTickets, foreignKey: 'ticketId'})
    }
  }
  Ticket.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    assignee: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    progressTracker: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['TODO','IN PROGRESS','COMPLETED'],
    },
    points: DataTypes.INTEGER,
    dateCreated: DataTypes.DATE,
    estimatedHours: DataTypes.INTEGER,
    actualHours: DataTypes.INTEGER,
    parent: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};