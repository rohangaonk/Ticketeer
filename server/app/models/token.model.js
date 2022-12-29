module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("tokens", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING,
    },
    expireAt: {
      type: Sequelize.DATE,
    },
  });
  return Token;
};
