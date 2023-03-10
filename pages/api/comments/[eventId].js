import { MongoClient } from "mongodb"

async function handler(req, res) {
  const eventId = req.query.eventId
  const { REACT_APP_DB_URL } = process.env

  const client = await MongoClient.connect(REACT_APP_DB_URL)

  if (req.method === "POST") {
    const { email, name, text } = req.body

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." })
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    }

    const db = client.db()

    const result = await db.collection("comments").insertOne({ newComment })

    console.log(result)

    newComment.id = result.insertedId

    res.status(201).json({ message: "Add comment.", comment: newComment })
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Max",
        text: "A first comment",
      },
      { id: "c2", name: "Alex", text: "Great group!" },
      { id: "c3", name: "Betty", text: "Had a good time at the last one" },
    ]

    res.status(200).json({ comments: dummyList })
  }
  client.close()
}

export default handler
