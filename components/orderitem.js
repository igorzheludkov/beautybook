import s from './orderitem.module.css'
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Avatar from './avatar'
import Calendar from './calendar'
import Link from 'next/link'


export default function OrderItem({ item, bookedOrders, user, showBooking }) {
  const [booked, setBooked] = useState(0)
  // function showBookingHandler() {
  //   booked === 0 ? setShowBooking(1) : setShowBooking(0)
  // }

  const currentTime = new Date()
  const [servData, setServData] = useState({
    photo: '',
    masterPhone: '',
    location: '',
    city: '',
    street: '',
    masterName: '',
    masterSurname: '',
    serv_id: '',
    masterId: '',
    item_1: '',
    masterEmail: '',
  })

  const [statusMessage, setStatusMessage] = useState({ status: 0, message: 'Оберіть місяць, дату та час' })

  useEffect(() => {
    setServData({
      ...servData,

      photo: user.userData.photo,
      masterPhone: user.userData.phone,
      location: user.userData.location,
      city: user.userData.city,
      street: user.userData.street,
      masterName: user.userData.name,
      masterSurname: user.userData.surname,
      serv_id: item._id,
      masterId: item.owner_id,
      item_1: item.item_1,
      masterEmail: item.owner,
    })
  }, [item])

  const defaultTime = {
    year: currentTime.getFullYear(),
    month: '',
    day: '',
    hour: '',
    minute: '',
  }
  const [contacts, setContacts] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    suggestions: '',
  })

  const [dayTime, setDayTime] = useState(defaultTime) // отримано поточну дату у форматі для конвертування у timestamp

  const choosenTimeStamp = new Date(
    `${dayTime.year}-${dayTime.month}-${dayTime.day}T${dayTime.hour}:${dayTime.minute}:00`
  ) // конвертує отриманий з календаря час в timestamp

  let orderData = {
    ...servData,
    ...contacts,
    visitDateTime: dayTime,
    orderId: Date.now(),
  }
  // orderData - об'єднує інформацію в єдине замовлення
  // Із функції повинна прийти дата бронювання у зручному для конвертації вигляді
  function visitHandler(e) {
    const typeMinute =
      e.target.dataset.typeIndexminutes < 10
        ? '0' + e.target.dataset.typeIndexminutes
        : e.target.dataset.typeIndexminutes
    const minuteField = e.target.dataset.typeFieldminutes
    const typeIndex =
      e.target.dataset.typeIndex < 10 ? '0' + e.target.dataset.typeIndex : e.target.dataset.typeIndex
    const fieldType = e.target.dataset.typeField

    minuteField
      ? setDayTime({ ...dayTime, [fieldType]: typeIndex, [minuteField]: typeMinute })
      : setDayTime({ ...dayTime, [fieldType]: typeIndex })
  }

  function clientContactsHandler(e) {
    setContacts({ ...contacts, [e.target.id]: e.target.value, visitDur: item.item_1.dur })
  }
console.log(dayTime);
  async function orderHandler(e) {
    e.preventDefault(e)
    if (validate) {
      const response = await fetch(`/api/order/`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await response.json()
      console.log(res);
      if (res.result.acknowledged) {
        mutate(`/api/bookedtime?q=${item.masterEmail}`)
        sendNotification()
      }
      console.log('Sended')
      console.log(res.result.acknowledged)
      showMessage()
      setBooked(1)
    }
    console.log('statusMessage')
  }

  async function sendNotification() {
    const sendMessage = await fetch('/api/notifications', {
      method: 'POST',
      body: JSON.stringify({
        email: servData.masterEmail,
        apiMethod: 'sendMessage',
        parseMode: 'HTML',
        message:
        `<b>У вас нове бронювання</b><pre>...</pre>
        Ім'я клієнта: ${contacts.clientName}<pre>...</pre>
        Телефон: ${contacts.clientPhone}<pre>...</pre>
        Дата: ${dayTime.day}.${+dayTime.month+1}.${dayTime.year}<pre>...</pre>
        Час: ${dayTime.hour}:${dayTime.minute}<pre>...</pre>
        <a href="http://krasa.uno/user/calendar/">Перейдіть в кабінет за даним посиланням щоб перенести або відмінити</a>`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const notificationsStatus = await sendMessage.json()
    console.log(notificationsStatus)
  }

  const validate = dayTime.month > 0 && dayTime.day > 0 && dayTime.hour > 0

  function showMessage() {
    setStatusMessage({
      status: 1,
      message: 'Бронювання надіслано. Можете вибрати інші послуги майстра та забронювати додаткові візити.',
    })
  }

  if (!bookedOrders && !user && !options) return <div>Loading...</div>

  return (
    <div
      className={s.orders_wrapper}
      style={showBooking ? (statusMessage.status ? { height: '60px' } : { height: '300px' }) : { height: 0 }}
    >
      {statusMessage.status === 0 && (
        <>
          <div className={s.calendar_wrapper}>
            {bookedOrders && <Calendar props={{ visitHandler, user, bookedOrders, item }} />}

            <form className={s.contacts}>
              <div>
                <input
                  className={s.clientName}
                  id='clientName'
                  value={contacts.clientName}
                  onChange={clientContactsHandler}
                  placeholder='Ваше ім`я'
                />
                <input
                  className={s.clientPhone}
                  id='clientPhone'
                  value={contacts.clientPhone}
                  onChange={clientContactsHandler}
                  placeholder='Ваш номер телефону'
                />
              </div>
              <button className={s.submit_btn} value={item.orderId} onClick={orderHandler}>
                Підтвердити
              </button>
            </form>
          </div>
        </>
      )}

      {statusMessage.status === 1 && (
        <div className={s.message_wrapper}>
          <div className={s.message}>{statusMessage.message}</div>
        </div>
      )}
    </div>
  )
}
