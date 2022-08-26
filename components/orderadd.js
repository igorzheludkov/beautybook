import { useState, useEffect } from 'react'
import s from './orderadd.module.css'
import getFormattedDay from './utils/getFormattedDay'
import useSWR, { mutate } from 'swr'


export default function OrderAdd({ user, serv, client, visitDateTime }) {
  const formattedDate = getFormattedDay(visitDateTime.year, visitDateTime.month, visitDateTime.day)
  const [servIndex, setServIndex] = useState(0)

  console.log(servIndex)
  const [clientData, setClientData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    suggestions: '',
  })

  const [servData, setServData] = useState({
    photo: user.userData.photo,
    masterPhone: user.userData.phone,
    location: user.userData.location,
    city: user.userData.city,
    street: user.userData.street,
    masterName: user.userData.name,
    masterSurname: user.userData.surname,
    masterId: user._id,
    serv_id: '',
    item_1: '',
    masterEmail: user.email,
    visitDur: serv.services[0].item_1.dur,
    orderId: Date.now()
  })

  function inputHandler(e) {
    setClientData({ ...clientData, [e.target.id]: e.target.value })
  }
  function servHandler(e) {
    setServData({
      ...servData,
      item_1: serv.services[e.target.value].item_1,
      serv_id: serv.services[e.target.value]._id,
      visitDur: serv.services[e.target.value].item_1.dur,
    })

    console.log(serv.services[e.target.value]._id)
  }

  const createdOrder = { ...clientData, ...servData, visitDateTime }

  console.log(createdOrder)
  console.log(serv)

  async function orderHandler(e) {
    e.preventDefault(e)
    // if (validate) {
      const response = await fetch(`/api/order/`, {
        method: 'POST',
        body: JSON.stringify(createdOrder),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await response.json()
      if (res.result.acknowledged) {
        mutate(`/api/order?q=${user.email}`)
      }
      console.log('Sended')
      console.log(res.result.acknowledged)
      // showMessage()
      // setBooked(1)
    // }
    console.log('statusMessage')
  }
  return (
    <div className={s.order_add}>
      <form className={s.client_data}>
        <input id='clientName' className={s.input_name} placeholder='Ім`я' onChange={inputHandler} />
        <input id='clientPhone' className={s.input_phone} placeholder='Телефон' onChange={inputHandler} />
        <select className={s.selectServ} onChange={servHandler}>
          {serv.services.map((i, index) => (
            <option key={i._id} value={index}>
              {i.item_1.name}, {i.item_1.dur}хв
            </option>
          ))}
        </select>
        <div className={s.date}>
          {formattedDate.weekday}, {formattedDate.number}.{visitDateTime.year}
        </div>
        <div className={s.time}>
          {visitDateTime.hour}:{visitDateTime.minute}
        </div>
      </form>
      <button className={s.submit_btn} onClick={orderHandler}>Додати</button>
    </div>
  )
}
