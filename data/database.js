// data/database.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let db;

const initDb = async (callback) => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    return callback('❌ MONGO_URI is missing in .env');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db(); // Uses default DB from URI
    callback();
  } catch (err) {
    callback(err);
  }
};

const getDatabase = () => db;

module.exports = {
  initDb,
  getDatabase
};
