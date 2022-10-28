'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assignee: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      points: {
        type: Sequelize.INTEGER
      },
      dateCreated: {
        type: Sequelize.DATE
      },
      estimatedHours: {
        type: Sequelize.INTEGER
      },
      actualHours: {
        type: Sequelize.INTEGER
      },
      parent: {
        type: Sequelize.INTEGER
      },
      progressTracker: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['TODO', 'IN PROGRESS', 'COMPLETED']
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};