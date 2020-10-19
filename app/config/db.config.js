module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "sherif1973",
  DB: "sofapp",
  dialect: "mysql",
  pool: {
    max: 55,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};