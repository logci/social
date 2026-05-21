import { MongoClient } from 'mongodb';

let clientPromise: Promise<MongoClient> | undefined;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

export default function getMongoClient() {
  if (globalWithMongo._mongoClientPromise) {
    return globalWithMongo._mongoClientPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment variables.');
  }

  const client = new MongoClient(uri);
  clientPromise = client.connect();
  globalWithMongo._mongoClientPromise = clientPromise;
  return clientPromise;
}
