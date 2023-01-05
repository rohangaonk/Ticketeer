class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    console.log(data);
    const savedEntity = await this.model.create(data);
    return savedEntity.get({ plain: true });
  };

  //returns array [no_of_updated_rows, [tickets, ...]]
  update = async (data, filter) => {
    const updatedEntity = await this.model.update(data, {
      where: filter,
      returning: true,
    });
    return updatedEntity[1] ? updatedEntity[1][0].get({ plain: true }) : null;
  };

  //direct query plain object
  findOne = async (filter) => {
    return await this.model.findOne({ where: filter, raw: true });
  };

  //direct query array of plain objects
  findAll = async (filter = null, modifiers = null) => {
    const items = await this.model.findAll({
      where: filter,
      ...modifiers,
      raw: true,
    });
    return items;
  };

  findByPk = async (id) => {
    const entity = await this.model.findByPk(id);
    return entity ? entity.get({ plain: true }) : null;
  };

  destroy = async (filter) => {
    return this.model.destroy({ where: filter });
  };
}

module.exports = BaseRepository;
