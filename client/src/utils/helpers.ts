export const removeNullKeys = (obj: { [key: string]: any }) => {
  const res: { [key: string]: any } = {};
  for (let key in obj) {
    if (obj[key]) res[key] = obj[key];
  }
  return res;
};
