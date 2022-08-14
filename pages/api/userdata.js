const { MongoClient } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Name
const dbName = 'beautybook'

export default async function UserData(req, res) {
  const db = client.db(dbName)
  await client.connect()
  const collection = db.collection('user_public')
  const userEmail = req.query.q
  const newUser = req.body
  const method = req.method
  console.log('userSettings', req.body.userSettings);

  switch (method) {
    case 'GET':
      const checkUser = await collection.findOne({
        email: userEmail,
      })
      await client.close()
      res.status(200).json(checkUser)
      break

    case 'POST':
      const filter = { email: req.body.email }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          userData: req.body.userData,
        },
      }
      const result = await collection.updateOne(filter, updateDoc, options)
      await client.close()
      res.status(200).json({ result: result })
      break

    case 'PUT':
      const findUser = await collection.findOne({
        email: req.body.email,
      })

      if (findUser === null) {
        const result = await collection.insertOne(newUser)
        await client.close()
        res.status(200).json({ message: 'user registered success', result: result })
      } else if (findUser.email === req.body.email) {
        await client.close()
        res.status(200).json({ result: 'such user allready registered' })
      }
      break

    case 'PATCH':
      const update = { email: req.body.email }
      const opt = { upsert: true }
      const updateSettings = {
        $set: {
          userSettings: req.body.userSettings,
        },
      }
      const updateResult = await collection.updateOne(update, updateSettings, opt)
      await client.close()
      res.status(200).json({ result: updateResult })
      break
  }
}
