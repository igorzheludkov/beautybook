

const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)
const dbName = 'beautybook'

export default async function GetData(req, res) {
    console.log(req.query);
//   if (req.query.q) {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_public')
    console.log('Searching for user...')
    const findUser = await collection.find({}).toArray()
    console.log(findUser)
    await client.close()
// }
res.status(200).json({user: findUser})

//   return 'done.'
}
