import { MongoClient } from "mongodb"
const { REACT_APP_DB_URL } = process.env

export async function connectDatabase() {
  const client = await MongoClient.connect(REACT_APP_DB_URL)

  return client
}

export async function insertDocument(client, collection, document) {
  const db = client.db()

  const result = await db.collection(collection).insertOne(document)

  return result
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db()

  const documents = await db.collection(collection).find().sort(sort).toArray()

  return documents
}
