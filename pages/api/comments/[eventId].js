function handler(req, res) {
  const eventID = req.query.eventId

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    }

    console.log(newComment)
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
}

export default handler
