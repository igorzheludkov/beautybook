const { MongoClient } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Name
const dbName = 'beautybook'

export default async function UserData(req, res) {
  const userEmail = req.query.q

  if (req.method === 'GET') {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_public')
    console.log('Connected successfully to server')
    const findUser = await collection
      .find({
        email: userEmail,
      })
      .toArray()
    res.status(200).json({ ...findUser })
  } else if (req.method === 'POST') {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_public')
    console.log('Connected successfully to server')
    const filter = { email: req.body.email }
    const options = { upsert: true }
    const updateDoc = {
      $set: {
        userData: req.body,
      },
    }
    const result = await collection.updateOne(filter, updateDoc, options)
    console.log(result)

    res.status(200).json({ result: '' })
  }

  return 'done.'
}
