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
        {
          parent_id: 'massage_0',
          type: 'poslugi',
          id: 'massage_1',
          url: 'classic-massage',
          full_name: 'Масаж класичний',
          short_name: 'Класичний',
          pic: `/images/cat_images/massage.png`
        },
        {
          parent_id: 'massage_0',
          type: 'poslugi',
          id: 'massage_2',
          url: 'classic-massage',
          full_name: 'Масаж спортивний',
          short_name: 'Спортивний',
          pic: `/images/cat_images/massage.png`
        },
        {
          parent_id: 'massage_0',
          type: 'poslugi',
          id: 'massage_3',
          url: 'likuvalnyi-massage',
          full_name: 'Масаж лікувальний',
          pic: `/images/cat_images/massage.png`,
          short_name: 'Лікувальний'
        },
        {
          parent_id: 'massage_0',
          type: 'poslugi',
          id: 'massage_4',
          url: 'dutiachui-massage',
          full_name: 'Масаж дитячий',
          pic: `/images/cat_images/massage.png`,
          short_name: 'Дитячий'
        },
        {
          parent_id: 'massage_0',
          type: 'poslugi',
          id: 'massage_5',
          url: 'massage-vagitnym',
          full_name: 'Масаж для вагітних',
          pic: `/images/cat_images/massage.png`,
          short_name: 'Для вагітних'
        }
      ]
    },
    {
      id: 'hair_0',
      url: 'volossia',
      pic: `/images/cat_images/hair.png`,
      main_name: 'Стрижки',
      prof_name: 'Масажист',
      serv_types: [
        {
          parent_id: 'hair_0',
          type: 'volossia',
          id: 'hair_1',
          url: 'cholovichi-stryzhky',
          full_name: 'Стрижки чоловічі',
          short_name: 'Чоловічі'
        },
        {
          parent_id: 'hair_0',
          type: 'volossia',
          id: 'hair_2',
          url: 'zhinochi-stryzky',
          full_name: 'Стрижки жіночі',
          short_name: 'Жіночі'
        },
        {
          parent_id: 'hair_0',
          type: 'volossia',
          id: 'hair_3',
          url: 'naroschyvanna-volossia',
          full_name: 'Нарощування волосся',
          short_name: 'Нарощування волосся'
        },
        {
          parent_id: 'hair_0',
          type: 'volossia',
          id: 'hair_4',
          url: 'kosychky',
          full_name: 'Косички',
          short_name: 'Косички'
        }
      ]
    },
    {
      id: 'nails_0',
      url: 'nigti',
      pic: `/images/cat_images/nails.png`,
      main_name: 'Нігті',
      serv_types: [
        {
          parent_id: 'nails_0',
          type: 'nigti',
          id: 'nails_1',
          url: 'manikur',
          full_name: 'Манікюр',
          short_name: 'Манікюр'
        },
        {
          parent_id: 'nails_0',
          type: 'nigti',
          id: 'nails_2',
          url: 'naroschyvanna-nigtiv',
          full_name: 'Нарощування нігтів',
          short_name: 'Нарощування'
        },
        {
          parent_id: 'nails_0',
          type: 'nigti',
          id: 'nails_3',
          url: 'pedykur',
          full_name: 'Педикюр',
          short_name: 'Педикюр'
        }
      ]
    }
  ]
  const location = [
    { type: 'location', id: 'vdoma', short_name: 'Вдома', url: 'vdoma' },
    { type: 'location', id: 'kabinet', short_name: 'Кабінет', url: 'kabinet' },
    { type: 'location', id: 'salon', short_name: 'Салон', url: 'salon' },
    { type: 'location', id: 'vyizd', short_name: 'На виїзд', url: 'vyizd' }
  ]

  const geo = [
    {
      obl_center: 'Вінниця',
      obl_name: 'Вінницька',
      obl_id: '21000',
      settlement: [
        { id: '21000', url: 'vinnytsia', type: 'м', name: 'Вінниця' },
        { id: '23310', url: 'hnivan', type: 'м', name: 'Гнівань' },
        { id: '23000', url: 'bar', type: 'м', name: 'Бар' },
        { id: '24400', url: 'bershad', type: 'м', name: 'Бершадь' },
        { id: '23700', url: 'hajsyn', type: 'м', name: 'Гайсин' },
        { id: '23100', url: 'zhmerynka', type: 'м', name: 'Жмеринка' },
        { id: '22400', url: 'kalynivka', type: 'м', name: 'Калинівка' },
        { id: '22100', url: 'kozyatyn', type: 'м', name: 'Козятин' },
        { id: '22800', url: 'nemyriv', type: 'м', name: 'Немирів' },
        { id: '22200', url: 'pohrebyshhe', type: 'м', name: 'Погребище' },
        { id: '23600', url: 'tulchyn', type: 'м', name: 'Тульчин' },
        { id: '22000', url: 'khmilnyk', type: 'м', name: 'Хмільник' },
        { id: '24500', url: 'yampil', type: 'м', name: 'Ямпіль' }
      ]
    },
    {
      obl_center: 'Київ',
      obl_name: 'Київська',
      obl_id: '01000',
      settlement: [
        { id: '01001', url: 'kyiv', type: 'м', name: 'Київ' },
        { id: '07300', url: 'vyshgorod', type: 'м', name: 'Вишгород' }
      ],
    }
  ]
  res.status(200).json({ poslugi, location, geo })
}
