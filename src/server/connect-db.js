import { MongoClient } from 'mongodb'; 
const url = 'mongodb://localhost:27017/myorganizer';
let db = null; 

export const connectDB = async () => {
  if (db) return db;
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info("Got Db,", db);
  return db;
}