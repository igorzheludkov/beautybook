const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)
const tokenTelegram = process.env.TELEGRAM_BOT_TOKEN

const dbName = 'beautybook'

export default async function UserData(req, res) {
  const db = client.db(dbName)
  const collection = db.collection('user_private')
  await client.connect()

  const {
    body: { email, telegramNickname, apiMethod },
    method,
  } = req

  const response = await fetch(`https://api.telegram.org/bot${tokenTelegram}/${apiMethod}`, {
    method: 'POST',
  })
  const data = await response.json()
  // const userChatId = await data.result.find((i) => i.message.from.username === telegramNickname)
  const userChatId = await data.result.find((i) => i.message.from.username === telegramNickname)
  console.log('25', userChatId)

  const checkChatId = await collection.findOne({
    email: email,
    chat_id: { $exists: true },
  })
  await client.close()

  let user= 'chat_id is added'
  if (checkChatId?.chat_id === null || checkChatId === null) {
    console.log('add to db')
    await client.connect()
    user = await collection.updateOne(
      { email: email },
      { $set: { tg_nickname: telegramNickname, chat_id: userChatId.message.chat.id } },
      { upsert: true }
    )
    console.log(user);
    await client.close()
  }
  console.log('43', checkChatId)

  switch (method) {
    case 'GET':
    //   const checkUser = await collection.findOne({
    //     email: userEmail,
    //   })
    //   await client.close()
    //   res.status(200).json(checkUser)
    //   break

    case 'POST':
      //   const filter = { email: req.body.email }
      //   const options = { upsert: true }
      //   const updateDoc = {
      //     $set: {
      //       userData: req.body.userData,
      //       userSettings: req.body.userSettings
      //     },
      //   }
      //   const result = await collection.updateOne(filter, updateDoc, options)
      //   await client.close()
      res.status(200).json({ result: user })
      break

    // case 'PUT':
    //     const user = await collection.insertOne(newUser)
    //     await client.close()
    //     res.status(200).json({ message: 'user registered successfully', result: user })
    //   break

    // case 'PATCH':
    //   const update = { email: req.body.email }
    //   const opt = { upsert: true }
    //   const updateSettings = {
    //     $set: {
    //       userNotifications: req.body.userNotifications,
    //     },
    //   }
    //   const updateResult = await collection.updateOne(update, updateSettings, opt)
    //   await client.close()
    //   res.status(200).json({ result: updateResult })
    //   break
  }
}
