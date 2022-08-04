const { MongoClient } = require('mongodb')

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Database Connevtion
const dbName = 'beautybook'

export default async function Orders(req, res) {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('orders')
    const method = req.method
    const data = { order: req.body }
    const query = req.query.q
    console.log('data', data)
    console.log('query', query)
    console.log('method', method)

    switch (method) {
        case 'GET':
            const finded = await collection.find({masterEmail: "zigor535@gmail.com"}).toArray()
            await client.close()
            console.log(finded)
            res.status(200).json({ message: 'finded services:', orders: finded })
            break

        case 'POST':
            const result = await collection.insertOne(data)
            await client.close()
            res.status(200).json({ message: 'servise added successfully', result: result })
            break
    }
}
