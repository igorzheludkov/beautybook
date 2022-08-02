const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

const dbName = 'beautybook'

export default async function Categories(req, res) {
  const cat = [
    { spec: 'Косметолог', sub_spec: ['Косметолог-естетист', 'Косметолог-дерматолог', 'Лікар-косметолог', "Косметолог-ін'єкціоніст"], },
    { spec: 'Масажист', sub_spec: ['Реабілітолог', 'Дитячий масажист', 'Мануальний терапевт', 'Кінезіотерапевт', 'Фізіотерапевт']},
    { spec: 'Візажист', sub_spec: []},
    { spec: 'Перукар', sub_spec: ['Перукар-колорист', 'Барбер', 'Перукар-стиліст', 'Перукар-візажист', 'Перукар-універсал', "Перукар-модель'єр", 'Жіночий перукар', 'Брейдер']},
    { spec: 'Майстер манікюру', sub_spec: []},
    { spec: 'Майстер тату', sub_spec: []},
    { spec: 'Майстер з пірсингу', sub_spec: []},
    { spec: 'Лешмейкер', sub_spec: []},
    { spec: 'Бровіст', sub_spec: []},
    { spec: 'Майстер депіляції', sub_spec: []},
    { spec: 'Викладач курсів', sub_spec: []},
    { spec: 'Остеопат', sub_spec: []},
    { spec: 'Дієтолог', sub_spec: []},
    { spec: 'Стиліст-іміджмейкер', sub_spec: []},
  ]

  const poslugi = [
    {name: 'Очищення обличчя', parent: 'Косметолог', types: ['Комбінована чистка обличчя','Атравматична чистка обличчя','Альгінатна маска','Лікування акне','Механічне очищення обличчя','Вакуумне очищення обличчя','Ультразвукове очищення обличчя','Гальванічне очищення обличчя','Очистка обличчя для чоловіків','Лазерна очистка']},
    {name: 'Пілінг обличчя', parent: 'Косметолог', types: ['Хімічний пілінг обличчя','Газорідинний пілінг обличчя','Лазерний пілінг обличчя','Мікродермабрація обличчя','Ексфлорація обличчя','Фітопілінг обличчя','Кораловий пілінг обличчя','Мезопілінг',]},
    {name: 'Масаж обличчя', parent: 'Масаж', types: ['Масаж обличчя від зморщок','Скульптурний массаж обличчя','Лімфодренажний масаж обличчя','Буккальний масаж обличчя','Масаж обличчя Гуаша',]}
  ]

  res.status(200).json({ categories: cat, poslugi: poslugi })
}