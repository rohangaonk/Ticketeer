const BaseRepository = require("./repository");
const ticketModel = require("../models").Ticket;
const userModel = require("../models").User;
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
          model: userModel,
          as: "assignee",
          attributes: ["name", "email", "id"],
        },
        {
          model: userModel,
          as: "assignor",
          attributes: ["name", "email", "id"],
        },
      ],
      ...modifiers,
    });
    return items;
  };

  findByPk = async (id) => {
    const entity = await this.model.findByPk(id, {
      include: [
        {
          model: userModel,
          as: "assignee",
          attributes: ["name", "email", "id"],
        },
        {
          model: userModel,
          as: "assignor",
          attributes: ["name", "email", "id"],
        },
      ],
    });
    return entity ? entity.get({ plain: true }) : null;
  };
}

module.exports = new TicketRepository(ticketModel);
