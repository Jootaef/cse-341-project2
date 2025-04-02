const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let db;

const dbName = 'project2';

const initDb = async (callback) => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    return callback('❌ MONGO_URI is missing in .env');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db(dbName); 
    console.log(`✅ Connected to MongoDB: ${dbName}`);
    callback();
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    callback(err);
  }
};

const getDatabase = () => {
  if (!db) {
    throw new Error('❌ Database not initialized. Call initDb first.');
  }
  return db;
};

module.exports = {
  initDb,
  getDatabase
};
