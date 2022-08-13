import s from './ordershistoryitem.module.css'
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import { useStoreContext } from '../context/store'
import { useState } from 'react'
import Avatar from './avatar'
import GetFormatedDay from './getFormatedDay'
import Link from 'next/link'

export default function OrdersHistoryItem({ order }) {
    const getDay = GetFormatedDay(
        order.visitDateTime.year,
        order.visitDateTime.month,
        order.visitDateTime.day
    )

    console.log(order)


    return (
        <div className={s.orders_wrapper}>
            <div className={s.serv}>
                <div className={s.serv_name}>{order.opt.name}</div>
                <div className={s.serv_price}>{order.opt.price} грн</div>
                <div className={s.serv_dur}>{order.opt.dur} хв </div>
            </div>
            <div className={s.master_info}>
                <div className={s.master_inner}>
                    <div className={s.avatar}>
                        <Avatar w={40} h={40} src={order.photo} />
                    </div>
                    <div>
                        <div className={s.master_name}>{order.masterName}</div>

                        <div className={s.master_name}>{order.masterSurname}</div>
                    </div>
                </div>
                <div className={s.master_adress}>
                    <div className={s.master_adressLogo}>
                        <Image width={20} height={20} src='/images/adress.png' alt='adress' />
                    </div>

                    <div>
                        <div>{order.city}</div>
                        <div>{order.street}</div>
                        <div>{order.location}</div>
                    </div>
                </div>
            </div>
            <div className={s.contacts}>
                <div className={s.phone_wrapper}>
                    <Image width={15} height={15} src='/images/phone.png' alt='time' />
                    <div className={s.phone_text}>{order.masterPhone}</div>
                </div>
                <div className={s.site}>
                    <Link href={`/catalog/${order.masterEmail}`}>
                        <a>Сторінка майстра</a>
                    </Link>
                </div>
            </div>

            <div className={s.daytime}>
                <div className={s.time_wrapper}>
                    <Image width={15} height={15} src='/images/orders.png' alt='time' />
                    <div className={s.time}>
                        {order.visitDateTime.hour}:{order.visitDateTime.minute}
                    </div>
                </div>
                <div className={s.date_wrapper}>
                    <Image width={15} height={15} src='/images/booking.png' alt='time' />
                    <div className={s.date}>
                        {getDay.weekday} {getDay.number}.{getDay.year}
                    </div>
                </div>
                <button className={s.cancel_btn}>Перенести</button>
            </div>

        
        </div>
    )
}
