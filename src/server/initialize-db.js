import { defaultState } from './defaultState';
import { connectDB } from './connect-db';

const initializeDB = async () => {
  let db = await connectDB();
  for (let collectionName in defaultState) {
    let collection = db.collection(collectionName);
    await collection.insertMany(defaultState[collectionName]);
  }
}

initializeDB();