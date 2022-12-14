const { MongoClient, ObjectId } = require('mongodb')
 
const url = process.env.MONGODB_URI
const client = new MongoClient(url)
const dbName = 'beautybook'

export default async function GetData(req, res) {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('user_public')
  console.log('Searching for user...')
  const findUser = await collection
    .find({
      $and: [
        { 'userData.isPageVisibleInCat': '1' },
        { 'userData.city': req.body.city },
        { 'userData.categories': req.body.category }
      ]
    })
    .toArray()
  await client.close()
  res.status(200).json({ user: findUser })
}
