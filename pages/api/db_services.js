const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

const dbName = 'beautybook'

export default async function Services(req, res) {
  const poslugi = [
    {
      id: 'massage_0',
      url: 'massage',
      pic: `/images/cat_images/massage.png`,
      main_name: 'Масаж',
      prof_name: 'Масажист',
      serv_types: [
        { id: 'massage_1', url: 'classic-massage', full_name: 'Масаж класичний', short_name: 'Класичний' },
        { id: 'massage_2', url: 'likuvalnyi-massage', full_name: 'Масаж лікувальний', short_name: 'Лікувальний' },
        { id: 'massage_3', url: 'dutiachui-massage', full_name: 'Масаж дитячий', short_name: 'Дитячий' },
        { id: 'massage_4', url: 'massage-vagitnym', full_name: 'Масаж для вагітних', short_name: 'Для вагітних' },
      ],
    },
    {
      id: 'hair_0',
      url: 'volossia',
      pic: `/images/cat_images/hair.png`,
      main_name: 'Стрижки',
      prof_name: 'Масажист',
      serv_types: [
        { id: 'hair_1', url: 'cholovichi-stryzhky', full_name: 'Стрижки чоловічі', short_name: 'Чоловічі' },
        { id: 'hair_2', url: 'zhinochi-stryzky', full_name: 'Стрижки жіночі', short_name: 'Жіночі' },
        { id: 'hair_3', url: 'naroschyvanna-volossia', full_name: 'Нарощування волосся', short_name: 'Нарощування волосся' },
        { id: 'hair_4', url: 'kosychky', full_name: 'Косички', short_name: 'Косички' },
      ],
    },
    {
      id: 'nails_0',
      url: 'nigti',
      pic: `/images/cat_images/nails.png`,
      main_name: 'Нігті',
      serv_types: [
        { id: 'nails_1', url: 'manikur', full_name: 'Манікюр', short_name: 'Манікюр' },
        { id: 'nails_2', url: 'naroschyvanna-nigtiv', full_name: 'Нарощування нігтів', short_name: 'Нарощування' },
        { id: 'nails_3', url: 'pedykur', full_name: 'Педикюр', short_name: 'Педикюр' },
      ],
    },
  ]

  res.status(200).json({ poslugi })
}
