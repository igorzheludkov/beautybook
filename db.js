let Services = [
  {
    _id: '',
    title: 'Масаж',
    cat_parent: 'services',
    url: 'massage',
    description: 'Опис категорії',
    parent_cat: 'poslugi',
    popularity: '',
    img_url: [],
  },
]

let Subcategories = [
  {
    title: 'Класичний масаж',
    cat_parent: 'massage',
    url: 'massage_classic',
    description: 'Опис категорії',
    popularity: '',
    img_url: [],
  },
  {
    title: 'Спортивний масаж',
    cat_parent: 'massage',
    url: 'massage_sport',
    popularity: '',
    img_url: [],
  },
]

let ChildCategory = [
  {
    title: 'Класичний масаж всього тіла',
    cat_main: 'massage',
    cat_parent: 'massage_classic',
    url: 'classic_vsogo_tila',
    description: 'Опис категорії',
    popularity: '',
    img_url: [],
  },
  {
    title: 'Масаж спини',
    parent_cat: 'massage_classic',
    url: 'massage_spina',
    description: 'Опис категорії',
    popularity: '',
    img_url: [],
  },
]

let Products = [
  {
    _id: '',
    owner: 'Current User id',
    cat_main: 'classic_vsogo_tila',
    cat_parent: 'massage_classic',
    cat_top: 'Massage',
    title: 'Масаж всього тіла класичний',
    item_basic: { id: '', title: '', price: '', dur: '' },
    item_opt_1: { id: '', title: '', price: '', dur: '' },
    item_opt_2: { id: '', title: '', price: '', dur: '' },
    description: '',
    popularity: '',
    img_url: [{ url: '', description: '' }],
  },
]

let UserPublic = [
  {
    _id: '',
    name: '',
    password: '',
    phone: '',
    surname: '',
    is_master: 'boolean',
    social_media: [
      { name: '', link: '', icon: '' },
      { name: '', link: '', icon: '' },
    ],
    specialization: [1, 2, 3],
    description: '',
    adress: {
      city: '',
      street: '',
      location: '',
    },
    preferences: {
      page_in_catalog: 'boolean',
      booking_active: 'boolean',
    },
    sertificats: [],
    reviews: [],
    akcii: { text: '', img: '' },
    fishka: { text: '', img: '' },
    working_hours: {
      begin: '',
      end: '',
      full_time: 'false',
    },
  },
]

let UserPrivate = [
  {

  }
]

let Booking = [
  {
    owner: 'owner _id',
    working_hours: {
      begin: '',
      end: '',
      full_time: 'false',
    },
    interval_between: '',
    excluded_time: [],
    booking_available: ['Задається для ручного режиму'],
  },
]

let Order = [
  {
    client_phone: '',
    client_name: '',
    order_date: '',
    master: '',
    total: '',
    services: [
      {
        id: '',
        title: '',
        price: '',
        quantity: 'рахувати по кількості броньованого часу',
        duration: '',
        date: [
          { day: '', time: '' },
          { day: '', time: '' },
        ],
        suggestions: '',
      },
    ],
  },
]

let BookMarks = [
  {
    phone: '',
    masters: [
      {
        master_id: '',
        name: '',
        specialization: '',
        phone: '',
        url: '',
        img: '',
        adress: '',
        notes: '',
      },
    ],
  },
]

// Для рендерингу календаря.
// Генерує час для бронювання на день
let hoursCalendar = []
let bookingPlan = []

let timeInterval = 60

let beginHours = 9 * 60
let endHours = 18 * 60

function timeConvert(n) {
  let num = n
  const hours = num / 60
  const rhours = Math.floor(hours)
  const minutes = (hours - rhours) * 60
  const rminutes = Math.round(minutes)

  return rminutes > 0 ? `${rhours}:${rminutes}` : `${rhours}`
}

do {
  hoursCalendar.push(beginHours)
  beginHours = beginHours + timeInterval
} while (beginHours < endHours)

console.log(hoursCalendar)

console.log(hoursCalendar.map((i) => timeConvert(i)))
console.log(bookingPlan)
