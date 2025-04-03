// backend/db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI || "mongodb+srv://antoniomatlala02:lnm47kVFVCJzLhR0@spendy.vbodvqm.mongodb.net/?retryWrites=true&w=majority&appName=spendy";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db("spendy"); // Use your actual database name here
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}

function getDB() {
  return db;
}

module.exports = { connectToMongo, getDB };
