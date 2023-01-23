const BaseRepository = require("./repository");
const { Ticket, User, Sequelize } = require("../models");

class TicketRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }
  findAll = async (filter = null, modifiers = null) => {
    const items = await this.model.findAll({
      where: filter,
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["name", "email", "id"],
        },
        {
          model: User,
          as: "assignor",
          attributes: ["name", "email", "id"],
        },
      ],
      ...modifiers,
    });
    return items;
  };

  findAndCountAll = async (filter = null, modifiers = null) => {
    const { count, rows } = await this.model.findAndCountAll({
      where: filter,
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["name", "email", "id"],
        },
        {
          model: User,
          as: "assignor",
          attributes: ["name", "email", "id"],
        },
      ],
      ...modifiers,
    });
    return { count, items: rows };
  };

  findByPk = async (id) => {
    const entity = await this.model.findByPk(id, {
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["name", "email", "id"],
        },
        {
          model: User,
          as: "assignor",
          attributes: ["name", "email", "id"],
        },
      ],
    });
    return entity ? entity.get({ plain: true }) : null;
  };

  findSearch = async (searchQuery) => {
    const { count, rows } = await this.model.findAndCountAll({
      where: {
        _search: {
          [Sequelize.Op.match]: Sequelize.fn("to_tsquery", searchQuery), // match text search for strings 'fat' and 'rat' (PG only)
        },
      },
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["name", "email", "id"],
        },
        {
          model: User,
          as: "assignor",
          attributes: ["name", "email", "id"],
        },
      ],
    });
    return { count, items: rows };
  };
}

module.exports = new TicketRepository(Ticket);
