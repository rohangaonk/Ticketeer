const Sequelize = require("sequelize");
const config = require("../config/config").development;
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    operatorsAliases: 0,
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Ticket = require("./ticket.model")(sequelize, Sequelize);
db.Token = require("./token.model")(sequelize, Sequelize);

const { User, Ticket, Token } = db;

User.hasMany(Ticket, { as: "assignee", foreignKey: "assigneeId" });
User.hasMany(Ticket, { as: "assignor", foreignKey: "assignorId" });

Ticket.belongsTo(User, { as: "assignee", foreignKey: "assigneeId" });
Ticket.belongsTo(User, { as: "assignor", foreignKey: "assignorId" });

User.hasOne(Token);
Token.belongsTo(User);

module.exports = db;
