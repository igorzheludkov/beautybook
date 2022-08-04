const { MongoClient } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Connevtion
const dbName = 'beautybook'

export default async function UserData(req, res) {
  const {
    query: { services },
    method,
} = req
console.log('services', services);

await client.connect()

  switch (method) {
    case 'GET':
      const finded = await client
      .db('beautybook')
      .collection('user_services')
      .find({
        owner: services,
      }).toArray()
      await client.close()
      console.log('SERVICES', finded);
      res.status(200).json({ message: 'finded services:', services: finded })
      break
  }
}