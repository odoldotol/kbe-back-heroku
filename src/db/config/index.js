const dotenv = require("dotenv");
dotenv.config();

const development = {
  username: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD,
  database: "kbe_dev",
  host: "127.0.0.1",
  dialect: "mysql",
  define: {
    "freezeTableName": true,
  }
};
const test = {
  username: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD,
  database: "kbe_test",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD,
  database: "kbe_prod",
  host: "127.0.0.1",
  dialect: "mysql",
};

module.exports = { development, production, test };