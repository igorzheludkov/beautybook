const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Connevtion
const dbName = 'beautybook'

export default async function UserData(req, res) {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('user_services')
    const data = req.body
    const query = req.query.q
    const filter = { _id: new ObjectId(data.id) }
    const options = { upsert: true }
    const replacement = {
        ...data,
    }
    const {
        query: { services },
        method,
    } = req
    console.log('query', data)
    switch (method) {
        case 'GET':
            const finded = await collection.findOne({ _id: new ObjectId(query) })
            await client.close()
            res.status(200).json({ message: 'finded services:', result: finded })
            break

        case 'POST':
            const result = await collection.insertOne(data)
            await client.close()
            res.status(200).json({ message: 'servise added successfully', result: result })
            break

        case 'PATCH':
            const edit = await collection.replaceOne(filter, replacement)
            await client.close()
            res.status(200).json({ message: 'service edited successfully', result: edit })
            break
        case 'DELETE':
            const remove = await collection.deleteOne(filter)
            await client.close()
            res.status(200).json({ message: 'service removed successfully', result: remove })
            break
    }
}
