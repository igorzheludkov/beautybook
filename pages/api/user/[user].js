const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

export default async function UserData(req, res) {
  await client.connect()
  const {
    query: { user },
    method,
  } = req
  //_id: new ObjectId('62e7a16f700bf0245de1748b')
  console.log('userId', user)
  const filter = user.includes('@') ? { email: user } : { '_id': ObjectId(user) }
  console.log('user_filter', filter)
  switch (method) {
    case 'GET':
      const findUser = await client.db('beautybook').collection('user_public').findOne(filter)
      console.log(findUser);
      await client.close()
      res.status(200).json(findUser)
      break
  }
}
