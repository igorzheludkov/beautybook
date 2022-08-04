const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Connevtion
// const dbName = 'beautybook'
// const db = client.db('beautybook')

export default async function UserData(req, res) {
    await client.connect()
    const {
        query: { user },
        method,
    } = req

    switch (method) {
        case 'GET':
            const findUser = await client
                .db('beautybook')
                .collection('user_public')
                .findOne({ _id: ObjectId(user) })
            await client.close()
            res.status(200).json(findUser)
            break

    }
}
