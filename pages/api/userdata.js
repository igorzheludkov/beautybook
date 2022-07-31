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
    console.log('Searching for user...')
    const findUser = await collection.findOne({
      email: userEmail,
    })
    await client.close()
    console.log(findUser)
    res.status(200).json(findUser)
  } else if (req.method === 'POST') {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_public')
    console.log('Updating user profile')
    const filter = { email: req.body.email }
    console.log(filter + 'filter')
    const options = { upsert: true }
    const updateDoc = {
      $set: {
        userData: req.body.userData,
      },
    }
    const result = await collection.updateOne(filter, updateDoc, options)
    await client.close()

    console.log(result)

    res.status(200).json({ result: '' })
  } else if (req.method === 'PUT') {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_public')
    const findUser = await collection.findOne({
      email: req.body.email,
    })

    // console.log('Connected successfully to server')
    const newUser = req.body
    // console.log(newUser)
    console.log(findUser)
    if (findUser === null) {
      const result = await collection.insertOne(newUser)
      await client.close()
      res.status(200).json({ message: 'user registered success', result: findUser })
    } else if (findUser.email === req.body.email) {
      res.status(200).json({ result: 'such user allready registered' })
    }

    

  }

  return 'done.'
}
