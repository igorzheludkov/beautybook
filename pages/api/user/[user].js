const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

export default async function UserData(req, res) {
  await client.connect()
  const {
    query: { user },
    method,
  } = req
  const filter = user.includes('@') ? { email: user } : { '_id': ObjectId(user) }
  switch (method) {
    case 'GET':
      const findUser = await client.db('beautybook').collection('user_public').findOne(filter)
      await client.close()
      res.status(200).json(findUser)
      break
  }
}
