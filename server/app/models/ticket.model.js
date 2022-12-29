const {
  TICKET_PRIORITY: PriorityType,
  TICKET_STATUS: StatusType,
} = require("../enums");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("tickets", {
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
    description: {
      type: Sequelize.STRING,
    },
    priority: {
      type: Sequelize.ENUM(
        PriorityType.HIGH,
        PriorityType.LOW,
        PriorityType.MEDIUM
      ),
    },
    status: {
      type: Sequelize.ENUM(StatusType.CLOSED, StatusType.OPEN),
    },
  });

  return User;
};
