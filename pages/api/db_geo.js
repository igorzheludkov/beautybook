const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

const dbName = 'beautybook'

export default async function Location(req, res) {
  const geo = [
    {
      obl_center: 'Вінниця',
      obl_name: 'Вінницька',
      location: [
        {id: 21012, type: 'м', name: 'Вінниця' },
        {id: 23310, type: 'м', name: 'Гнівань' },
        {id: 23000, type: 'м', name: 'Бар' },
        {id: 24400, type: 'м', name: 'Бершадь' },
        {id: 23700, type: 'м', name: 'Гайсин' },
        {id: 23100, type: 'м', name: 'Жмеринка' },
        {id: 22400, type: 'м', name: 'Калинівка' },
        {id: 22100, type: 'м', name: 'Козятин' },
        {id: 22800, type: 'м', name: 'Немирів' },
        {id: 22200, type: 'м', name: 'Погребище' },
        {id: 23600, type: 'м', name: 'Тульчин' },
        {id: 22000, type: 'м', name: 'Хмільник' },
        {id: 24500, type: 'м', name: 'Ямпіль' },
      ],
      villages: [
        { id: 23211, type: 'смт', name: 'Стрижавка' },
        { id: 19525, type: 'село', name: 'Стадниця' },
        { id: 23206, type: 'село', name: 'Щітки' },
        { id: 23205, type: 'село', name: 'Писарівка' },
        { id: 23234, type: 'село', name: 'Лука Мелешківська' },
        { id: 23227, type: 'смт', name: 'Агрономічне' },
        { id: 23223, type: 'село', name: 'Зарванці' },
        { id: 23316, type: 'село', name: 'Селище' },
        { id: 23222, type: 'село', name: 'Якушинці' },
      ],
    },
  ]

  res.status(200).json({ geo })
}
