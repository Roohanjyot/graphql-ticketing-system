'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Ticket, {through: models.UserTickets, foreignKey: 'userId'})
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    superUser: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};