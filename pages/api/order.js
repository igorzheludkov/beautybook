const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Connevtion
const dbName = 'beautybook'

export default async function Order(req, res) {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('orders')
  const method = req.method
  const data = req.body
  const query = req.query.q
  const filter = { _id: new ObjectId(data.id) }
  const options = { upsert: true }
  const replacement = {
    ...data,
  }

  switch (method) {
    case 'GET':
      const finded = await collection.find({ masterEmail: query }).toArray()
      await client.close()
      res.status(200).json({ message: 'finded services:', orders: finded })
      break

    case 'POST':
      const result = await collection.insertOne(data)
      await client.close()
      res.status(200).json({ message: 'order added successfully', result: result })
      break
    case 'PATCH':
      const edit = await collection.replaceOne(filter, replacement)
      await client.close()
      res.status(200).json({ message: 'order edited successfully', result: edit })
      break
  }
}
