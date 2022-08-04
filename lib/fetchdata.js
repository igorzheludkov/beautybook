import { useStoreContext } from '../context/store'
import { server } from '../config/index'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'

export default function FetchData({ userInfo }) {
    const [store, setStore] = useStoreContext()
    const { data: session, status } = useSession()

    // useEffect(() => {
    //     session && GetServices(session.user.email)
    // }, [session])

    // const GetServices = async (email) => {
    //     // const data = await fetch(`${server}/api/services_api?q=${email}`, {
    //     //     method: 'GET',
    //     // })
    //     // const userServ = await data.json()

    //     const res = await fetch(`${server}/api/getdata?q=${email}`, {
    //         method: 'GET',
    //     })
    //     const userProfile = await res.json()
    //     setStore({ ...store, services: userServ.result, userProfile: userProfile })
    // }

    console.log('Store ', store)
}
