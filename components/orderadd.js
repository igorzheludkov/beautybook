import { useState, useEffect } from 'react'
import s from './orderadd.module.css'
import getFormattedDay from './utils/getFormattedDay'
import useSWR, { mutate } from 'swr'
import { useStoreContext } from '../context/store'

export default function OrderAdd({ user, client, visitTime, editOrder, cancelOrderHandler }) {
  const [store, setStore] = useStoreContext()
  const [method, setMethod] = useState('POST')
  const formattedDate = getFormattedDay(visitTime.year, visitTime.month, visitTime.day)
  const [formVisible, setFormVisible] = useState(0)
  const [visitDateTime, setVisitDateTime] = useState(visitTime)
  const [serv, setServ] = useState([])
  useEffect(() => {
    if (store.services) {
      setServ(store.services)
    }
  }, [store?.services])

  useEffect(() => {
    setVisitDateTime({
      ...visitDateTime,
      year: visitTime.year,
      month: visitTime.month,
      day: visitTime.day,
      hour: visitTime.hour,
      minute: visitTime.minute,
    })
  }, [visitTime])

  useEffect(() => {
    if (editOrder._id?.length > 0) {
      setMethod('PATCH')
      setFormVisible(1)
      setClientData({
        clientName: editOrder.clientName,
        clientEmail: editOrder.clientEmail,
        clientPhone: editOrder.clientPhone,
        suggestions: editOrder.suggestions,
      })
      setServData({ ...servData, id: editOrder._id })
      setVisitDateTime({
        ...visitDateTime,
        hour: editOrder.visitDateTime.hour,
        minute: editOrder.visitDateTime.minute,
      })
    }
  }, [editOrder])

  const clientDataState = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    suggestions: '',
  }

  const [clientData, setClientData] = useState(clientDataState)

  const servDataInnitialState = {
    photo: '',
    masterPhone: '',
    location: '',
    city: '',
    street: '',
    masterName: '',
    masterSurname: '',
    masterId: '',
    serv_id: '',
    item_1: '',
    masterEmail: '',
    visitDur: '',
    orderId: Date.now(),
  }

  const [servData, setServData] = useState(servDataInnitialState)


  useEffect(() => {
    serv.services && user && setServData({
      ...servData,
      photo: user.userData.photo,
      masterPhone: user.userData.phone,
      location: user.userData.location,
      city: user.userData.city,
      street: user.userData.street,
      masterName: user.userData.name,
      masterSurname: user.userData.surname,
      masterId: user._id,
      serv_id: serv?.services[0]?._id,
      item_1: serv?.services[0]?.item_1,
      masterEmail: user.email,
      visitDur: serv?.services[0]?.item_1?.dur,
      orderId: Date.now(),
    })
  }, [serv, user])

  function cancelHandler(e) {
    e?.preventDefault(e)
    setMethod('POST')
    setFormVisible(0)
    cancelOrderHandler(e)
    setClientData(clientDataState)
  }

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
  }

  const createdOrder = { ...clientData, ...servData, visitDateTime }


  function formPositionHandler(e) {
    formVisible === 0 ? setFormVisible(1) : setFormVisible(0)
  }

  async function orderHandler(e) {
    e.preventDefault(e)
    // if (validate) {
    const response = await fetch(`/api/order/`, {
      method: method,
      body: JSON.stringify(createdOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const res = await response.json()
    if (res.result.acknowledged) {
      mutate(`/api/order?q=${user.email}`)
    }
    setTimeout(() => {
      cancelHandler()
    }, 1)
    console.log('Sended')
    console.log(res.result.acknowledged)
    // showMessage()
    // setBooked(1)
    // }
    console.log('statusMessage')
  }

  // if (!serv.services) return <div className={s.loading}>Loading</div>
  return (
    <div className={s.order_add} style={formVisible ? { left: 5 } : { left: -360 }}>
      <div className={s.daytime}>
        <div className={s.time}>
          {visitDateTime.hour}:{visitDateTime.minute ? visitDateTime.minute : '00'}
        </div>
        <div className={s.date}>
          {formattedDate.number}.{visitDateTime.year}
        </div>
      </div>
      <form className={s.client_data}>
        <input
          value={clientData.clientName}
          id='clientName'
          className={s.input_name}
          placeholder='Ім`я'
          onChange={inputHandler}
        />
        <input
          value={clientData.clientPhone}
          id='clientPhone'
          className={s.input_phone}
          placeholder='Телефон'
          onChange={inputHandler}
        />
        <select className={s.selectServ} onChange={servHandler}>
          {serv.services?.map((i, index) => (
            <option key={i._id} value={index}>
              {i.item_1.name}, {i.item_1.dur}хв
            </option>
          ))}
        </select>
        <button className={s.cancel_btn} onClick={cancelHandler} value='cancel'>
          Відмінити
        </button>
        <button className={s.submit_btn} onClick={orderHandler} value='save'>
          Зберегти
        </button>
      </form>
      <button className={s.add_btn} onClick={formPositionHandler}>
        {formVisible ? 'Згорнути' : 'Додати'}
      </button>
    </div>
  )
}
