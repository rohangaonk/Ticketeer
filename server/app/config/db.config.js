module.exports = {
  HOST: "localhost",
  USER: "rohan",
  PASSWORD: "roy4707",
  DB: "myapi",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
