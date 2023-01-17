export const removeNullKeys = (obj) => {
  const res = {};
  for (let key in obj) {
    if (obj[key]) res[key] = obj[key];
  }
  return res;
};
