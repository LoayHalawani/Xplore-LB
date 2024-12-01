// const Pool = require("pg").Pool;

// const pool = new Pool({
//   USER: "postgres",
//   PASSWORD: "password",
//   HOST: "localhost",
//   PORT: 5432,
//   DB: "xplorelb_db",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

// module.exports = pool;

module.exports = {
  USER: "postgres",
  PASSWORD: "password",
  HOST: "localhost",
  PORT: 5432,
  DB: "xplorelb_db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
