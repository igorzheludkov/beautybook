import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { server } from '../../config/index'

const fetcher = (url) => fetch(url).then((res) => res.json())

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

export default function BookingAdd({ user }) {
    const { data: userData } = useSWR(user ? `/api/userpublic?q=${user.email} ` : null, fetcher)
    const router = useRouter()
    const data = userData?.userData

    const [formData, setFormData] = useState([])

    if (!userData) return <div>Loading...</div>

    const masterData = {
        masterId: '62e6840acf4d88a22c64aeed',
        masterName: 'Ігор',
        masterSurname: 'Желудков',
        masterPhone: '0965468565',
        masterEmail: user?.email,
        photo: data?.photo,
        city: 'м. Вінниця',
        street: 'вул. Космонавтів 65',
        location: 'Торговий цетр МИР',
    }
    const clientData = {
        clientEmail: '500griven@gmail.com',
        clientName: 'Ігор Желудков',
        clientPhone: '',
    }
    const serviceData = {
        orderId: 1660157986333,
        title: 'Масаж всього тіла',
        visitDur: '60',
        visitDateTime: { year: 2022, month: '07', day: '11', hour: '08', minute: '00' },
        serviceId: '62ea1547b4912b56079c3c2f',
        option: { price: '600', dur: '60' },
        suggestions: '',
    }
    
    console.log(user)
    console.log(data)
    console.log('formData', formData)

    async function bookingHandler(e) {
        e.preventDefault(e)
        if (validate) {
            const response = await fetch(`/api/order/`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const res = await response.json()
            if (res.result.acknowledged) {
                mutate(`/api/bookedtime?q=${item.masterEmail}`)
            }
            console.log('Sended')
            console.log(res.result.acknowledged)
            showMessage()
            setTimeout(() => {
                router.push('/user/booking')
            }, 1000)
        }
        console.log('statusMessage')
    }

    function showMessage() {}

    // const validate = dayTime.month > 0 && dayTime.day > 0 && dayTime.hour > 0
}
