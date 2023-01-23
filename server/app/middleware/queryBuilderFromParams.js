/*
type {
  filter:{},
  order:"",
  limit:"",
  offset:"",
  search:""
}
*/

module.exports = (req, res, next) => {
  try {
    let { filter, order, limit, offset } = req.query || {};
    const search = filter?.search;
    const modifier = {};
    if (limit) {
      modifier.limit = limit;
    }
    if (offset) {
      modifier.offset = offset;
    }
    if (order) {
      const { key, value } = createSortOrder(order);
      modifier.order = [[key, value]];
    }

    req.query.filter = { filter, modifier, search };
    next();
  } catch (err) {
    next(err);
  }
};

// order:"DATE_ASC" to {key:"createdAt", value:"DESC"}
const createSortOrder = (order) => {
  if (order === "DATE_ASC") return { key: "createdAt", value: "ASC" };
  if (order === "DATE_DESC") return { key: "createdAt", value: "DESC" };
};
