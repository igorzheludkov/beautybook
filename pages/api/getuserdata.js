const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Connevtion
const dbName = 'beautybook'

export default async function UserData(req, res) {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_public')
    const method = req.method
    const data = req.body
    const query = req.query.q

    console.log('getuserdata', query);

    switch (method) {
        case 'GET':
            const findUser = await collection.findOne({ _id: new ObjectId(query) })

            await client.close()
            res.status(200).json({ message: 'finded services:', result: findUser })
            break

        case 'POST':
            const result = await collection.insertOne(data)
            await client.close()
            res.status(200).json({ message: 'servise added successfully', result: result })
            break
    }
}
