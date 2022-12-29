"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn("tickets", "body", "description");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn("tickets", "description", "body");
  },
};
