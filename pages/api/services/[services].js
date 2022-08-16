const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)


export default async function UserData(req, res) {
  await client.connect()
  const {
    query: { services },
    method,
} = req

const filter = services.includes('@') ? { owner: services } : { userId: services}


  switch (method) {
    case 'GET':
      const finded = await client
      .db('beautybook')
      .collection('user_services')
      .find(filter).toArray()
      await client.close()
      console.log('finded', finded);
      res.status(200).json({ message: 'finded services:', services: finded })
      break
  }
}
