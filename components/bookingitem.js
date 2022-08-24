import s from './bookingitem.module.css'
import GetFormatedDay from './getFormatedDay'
import Link from 'next/link'

export default function OrderItem({ item }) {


    const getDay = GetFormatedDay(item.visitDateTime.year, item.visitDateTime.month, item.visitDateTime.day)



    return (
        <div className={s.booking_wrapper}>
            <div className={s.header}>
                <div className={s.title}>{item.item_1.name}</div>
                <div className={s.title_info}>
                    <div className={s.price}>{item.item_1.price} грн</div>
                    <div className={s.dur}>{item.item_1.dur} хв</div>
                </div>
            </div>
            <div className={s.booking_details}>
                <div className={s.booking_inner}>
                    <div className={s.date_time}>
                        <div className={s.time}>
                            {item.visitDateTime.hour}:{item.visitDateTime.minute}
                        </div>
                        <div className={s.date}>
                            {getDay.weekday} {getDay.number}.{getDay.year}
                        </div>
                    </div>
                </div>
                <div className={s.buttons}>
                    <button className={s.shift}>
                        <Link href={`/user/booking/${item._id}`}>
                            <a>Редагувати</a>
                        </Link>
                    </button>
                </div>
            </div>
            <div className={s.contacts}>
                <div className={s.phone}>{item.clientPhone}</div>
                <div className={s.name}>{item.clientName}</div>
            </div>
        </div>
    )
}
