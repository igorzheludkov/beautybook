const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)
const dbName = 'beautybook'

export default async function GetData(req, res) {
  console.log('req.body', req.body)
  console.log(req.body.city)
  //   { 'userData.isPageVisibleInCat': '1' },
  //   if (req.query.q) {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('user_public')
  console.log('Searching for user...')
  const findUser = await collection
    .find({ $and: [{ 'userData.isPageVisibleInCat': '1' }, { 'userData.city': req.body.city }, { 'userData.categories': [req.body.category] }] })
    .toArray()
  await client.close()
  // }
  console.log(findUser)
  res.status(200).json({ user: findUser })
}
