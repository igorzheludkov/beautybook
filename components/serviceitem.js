import { useState } from 'react'
import s from './serviceitem.module.css'
import Gallery from './ui/gallery'
import OrderItem from './orderitem'
import { BookingButton } from './ui/button'

export default function ServiceItem({ data, user, bookedOrders }) {
  const [showBooking, setShowBooking] = useState(0)
  function showBookingHandler() {
    showBooking === 0 ? setShowBooking(1) : setShowBooking(0)
  }

  return (
    <>
      <div className={s.serv_wrapper}>
        <div className={s.serv_inner}>
          <div className={s.serv_item}>
            <span className={s.serv_title}>{data.item_1.name}</span>
            <div>
              <div className={s.price_dur}>
                <span className={s.serv_price}>{data.item_1.price} грн</span>
                <span className={s.serv_duration}>{data.item_1.dur} хв</span>
              </div>
              <BookingButton onClick={showBookingHandler}>
                {showBooking ? 'Приховати' : 'Забронювати'}
              </BookingButton>
            </div>
          </div>
          <OrderItem item={data} user={user} bookedOrders={bookedOrders} showBooking={showBooking} />
          <div className={s.serv_desc}>{data.about.description}</div>
        </div>
        <Gallery data={data.pic} />
      </div>
    </>
  )
}
