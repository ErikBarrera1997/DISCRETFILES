const { MongoClient } = require('mongodb');
const { loadEnv } = require('./load_env');

loadEnv();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env");
}

const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Conexión exitosa a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  } finally {
    await client.close();
  }
}

testConnection();
