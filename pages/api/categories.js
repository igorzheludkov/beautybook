const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

const dbName = 'beautybook'

export default async function Categories(req, res) {
  const categories = [
    {
      spec: 'Косметолог',
      sub_spec: [
        'Косметолог-естетист',
        'Косметолог-дерматолог',
        'Лікар-косметолог',
        "Косметолог-ін'єкціоніст",
      ],
    },
    {
      spec: 'Масажист',
      sub_spec: [
        'Реабілітолог',
        'Дитячий масажист',
        'Мануальний терапевт',
        'Кінезіотерапевт',
        'Фізіотерапевт',
      ],
    },
    { spec: 'Візажист', sub_spec: [] },
    {
      spec: 'Перукар',
      sub_spec: [
        'Перукар-колорист',
        'Барбер',
        'Перукар-стиліст',
        'Перукар-візажист',
        'Перукар-універсал',
        "Перукар-модель'єр",
        'Жіночий перукар',
        'Брейдер',
      ],
    },
    { spec: 'Майстер манікюру', sub_spec: [] },
    { spec: 'Майстер тату', sub_spec: [] },
    { spec: 'Майстер з пірсингу', sub_spec: [] },
    { spec: 'Лешмейкер', sub_spec: [] },
    { spec: 'Бровіст', sub_spec: [] },
    { spec: 'Майстер депіляції', sub_spec: [] },
    { spec: 'Викладач курсів', sub_spec: [] },
    { spec: 'Остеопат', sub_spec: [] },
    { spec: 'Дієтолог', sub_spec: [] },
    { spec: 'Стиліст-іміджмейкер', sub_spec: [] },
  ]

  res.status(200).json({ categories })
}
