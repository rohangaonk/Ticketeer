/*
type filter = {
  filter:{},
  order:"",
  limit:"",
  offset:"",
}
*/

module.exports = (req, res, next) => {
  try {
    const criteria = req.query.filter ? JSON.parse(req.query.filter) : {};
    console.log("criteria*********", criteria);
    let { filter, order, limit, offset } = criteria;
    filter = filter ? filter : null;
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

    req.query.filter = { filter, modifier };
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
