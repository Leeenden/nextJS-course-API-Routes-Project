import { MongoClient } from "mongodb"

async function handler(req, res) {
  const { REACT_APP_DB_URL } = process.env

  if (req.method === "POST") {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." })
      return
    }

    const client = await MongoClient.connect(REACT_APP_DB_URL)
    const db = client.db()

    await db.collection("emails").insertOne({ email: userEmail })

    client.close()

    res.status(201).json({ message: "Signed Up!" })
  }
}

export default handler
