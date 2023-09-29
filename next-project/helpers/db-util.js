//mongodb+srv://mosobelulu:bnwZF6Y5pBFB3ZmR@cluster0.cipchht.mongodb.net/newsletter?retryWrites=true&w=majority
import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  console.log("kskskjd")
    const client = await MongoClient.connect(
      'mongodb+srv://lulumosobe:6n0HXow6mHcmkNCQ@cluster0.mg7x39r.mongodb.net/events?retryWrites=true&w=majority'
    );
  
    return client;
  }
  
  export async function insertDocument(client, collection, document) {
    const db = client.db();
  
    const result = await db.collection(collection).insertOne(document);
  
    return result;
  }
  
  export async function getAllDocuments(client, collection, sort) {
    const db = client.db();
  
    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();
  
    return documents;
  }