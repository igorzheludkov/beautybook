

const { MongoClient, ObjectId } = require('mongodb')
// const {  } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)
const dbName = 'beautybook'

export default async function GetData(req, res) {
  if (req.query.q) {
    const email = req.query.q
    console.log(email)
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_public')
    console.log('getdata - Searching for user...')
    const findUser = await collection.findOne({email: email})
    // const findUser = await collection.findOne({"_id": new ObjectId(id)})
    await client.close()
    res.status(200).json(findUser)
  }

  return 'done.'
}
