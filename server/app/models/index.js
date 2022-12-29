const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Ticket = require("./ticket.model")(sequelize, Sequelize);
db.Token = require("./token.model")(sequelize, Sequelize);

const { User, Ticket, Token } = db;

User.hasMany(Ticket, { as: "assignee", foreignKey: "assigneeId" });
User.hasMany(Ticket, { as: "assignor", foreignKey: "assignorId" });

User.hasOne(Token);
Token.belongsTo(User);

module.exports = db;
