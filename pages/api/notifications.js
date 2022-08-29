const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)
const tokenTelegram = process.env.TELEGRAM_BOT_TOKEN

const dbName = 'beautybook'

export default async function Notifications(req, res) {
  const db = client.db(dbName)
  const collection = db.collection('user_private')
  await client.connect()

  const {
    body: { email, telegramNickname, apiMethod, parseMode, message },
    method,
  } = req

  let user = 'chat_id is already added'

  // telegram bot getUpdates method
  const getUpdates = await fetch(`https://api.telegram.org/bot${tokenTelegram}/getUpdates`, {
    method: 'POST',
  })
  const data = await getUpdates.json()
  // filter current user from updates list
  const userChatId = await data.result.find((i) => i.message.from.username === telegramNickname)
  console.log('25', userChatId)

  // check if db has chat_id prorerty
  const checkChatId = await collection.findOne({
    email: email,
    chat_id: { $exists: true },
  })
  await client.close()

  // create new document if chat_id was not finded in db
  if (checkChatId?.chat_id === null || checkChatId === null) {
    if (userChatId?.message?.chat?.id) {await client.connect()
    user = await collection.updateOne(
      { email: email },
      { $set: { chat_id: userChatId.message.chat.id } },
      { upsert: true }
    )
    await client.close()}
  }
  console.log('43', checkChatId?.chat_id)

  // send message to user from telegram bot
  switch (apiMethod) {
    case 'sendMessage':
      const sendMessage = await fetch(
        `https://api.telegram.org/bot${tokenTelegram}/sendMessage?chat_id=${checkChatId?.chat_id}&parse_mode=${parseMode}&text=${message}`,
        {
          method: 'POST',
        }
      )
      const data = await sendMessage.json()
      console.log(data);
  }

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
      res.status(200).json({ result: user})
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
