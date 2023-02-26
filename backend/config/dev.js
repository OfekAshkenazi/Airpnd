require('dotenv').config();

const dbURL = process.env.DB_URL;
const dbName = process.env.DB_NAME;

module.exports = {
  dbURL: dbURL,
  dbName : dbName
}

