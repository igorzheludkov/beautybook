import Image from 'next/image'
import { useStoreContext } from '../context/store'
import s from './serviceitem.module.css'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Router } from 'next/router'
import { useRouter } from 'next/router'
import AliceCarousel from 'react-alice-carousel'
import Gallery from './ui/gallery'

export default function ServiceItem({ data, user }) {
  const router = useRouter()
  const [store, setStore] = useStoreContext()
  const { data: session, status } = useSession()
  const [checked, setChecked] = useState()


  function cartHandler(e) {
    e.preventDefault()
    setStore({
      ...store,
      orders: [
        ...store.orders,
        {
          orderId: Date.now(),
          masterEmail: user.email,
          masterId: user._id,
          masterName: user.userData.name,
          masterSurname: user.userData.surname,
          street: user.userData.street,
          city: user.userData.city,
          location: user.userData.location,
          masterPhone: user.userData.phone,
          photo: user.userData.photo,
          serviceItem: data,
        },
      ],
    })
    setChecked(1)
  }



  return (
    <>
      <div className={s.serv_wrapper}>
        <div className='container'>
          <div className={s.serv_inner}>
            <div className={s.serv_item}>
              <span className={s.serv_title}>{data.item_1.name}</span>
              <span className={s.serv_price}>{data.item_1.price} грн</span>
              <span className={s.serv_duration}>{data.item_1.dur} хв</span>
            </div>
            <div className={s.serv_item}>
              {data.item_2.name && (
                <>
                  <span className={s.serv_subtitle}>{data.item_2.name}</span>
                  <span className={s.serv_subprice}>{data.item_2.price} грн</span>
                  <span className={s.serv_subduration}>{data.item_2.dur} хв</span>
                </>
              )}
            </div>
            <div className={s.serv_item}>
              {data.item_3.name && (
                <>
                  <span className={s.serv_subtitle}>{data.item_3.name}</span>
                  <span className={s.serv_subprice}>{data.item_3.price} грн</span>
                  <span className={s.serv_subduration}>{data.item_3.dur} хв</span>
                </>
              )}
            </div>
            <div className={s.desc}>
              <div className={s.serv_desc}>{data.about.description}</div>
              <div className={s.buttons}>
                {user.userData.isBookingActivated == '1' && ((checked) ? (
                  <button
                    className={s.gotocart}
                    onClick={() => {
                      router.push({
                        pathname: '/orders',
                      })
                    }}
                  >
                    Вибрати час і забронювати
                  </button>
                ) : (
                  <button className={s.addtocart} onClick={cartHandler}>
                    Додати в кошик
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Gallery data={data.pic} />
      </div>
    </>
  )
}
