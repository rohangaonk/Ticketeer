/*
type {
  filter:{},
  order:"",
  limit:"",
  offset:"",
}
*/

module.exports = (req, res, next) => {
  try {
    console.log("*********", req.query);
    let { filter, order, limit, offset } = req.query || {};
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

    console.log({ filter, modifier });
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
