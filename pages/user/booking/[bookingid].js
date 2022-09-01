import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { server } from '../../../config/index'
import { useStoreContext } from '../../../context/store'
import s from '../../../styles/booking.module.css'


export default function BookingAdd({ user }) {
    const router = useRouter()
    const [store, setStore] = useStoreContext()
    const [item, setItem] = useState([])


    useEffect(() => {
        setItem(...store.booking.filter(i=> router.query.bookingid === i._id))
    }, [router])

    async function removeHandler (e) {
        e.preventDefault(e)
        const response = await fetch('/api/booking_api', {
            method: 'DELETE',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        console.log('Sended')
        if (data.result.deletedCount > 0) {
            mutate(`/api/order?q=${user.email}`)
            router.push('/user/booking')
        }
        console.log(data.result.deletedCount > 0)
    }
    
    
    console.log(router.query.bookingid);
    return(<button className={s.cancel} onClick={removeHandler}>Видалити</button>)


}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }

    return {
        props: {
            user: session.user,
        },
    }
}
