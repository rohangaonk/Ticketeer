"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("users", "name", {
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "name");
  },
};
