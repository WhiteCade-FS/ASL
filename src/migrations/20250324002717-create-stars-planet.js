'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('StarsPlanets', {
       StarId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Stars',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      PlanetId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Planets',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }) 
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('StarsPlanets');
  }
};
