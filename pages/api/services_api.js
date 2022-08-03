const { MongoClient } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Connevtion
const dbName = 'beautybook'

export default async function UserData(req, res) {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('user_services')
  const method = req.method
  const data = req.body
  const query = req.query.q
  console.log(data)

  switch (method) {
    case 'GET':
      const finded = await collection.find({
        email: req.body.email,
      }).toArray()
      await client.close()
      res.status(200).json({ message: 'finded services:', result: finded })
      break

    case 'POST':
      const result = await collection.insertOne(data)
      await client.close()
      res.status(200).json({ message: 'servise added successfully', result: result })
      break
  }
}
