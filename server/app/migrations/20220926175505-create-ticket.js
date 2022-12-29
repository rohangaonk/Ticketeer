"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      assigneeId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      assignorId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      priority: {
        type: Sequelize.ENUM("low", "medium", "high"),
      },
      status: {
        type: Sequelize.ENUM("open", "closed"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickets");
  },
};
