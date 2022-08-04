import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import s from '../../styles/login.module.css'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import { useStoreContext } from '../../context/store'
import { useSession } from 'next-auth/react'


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

export default function User() {
    const [store, setStore] = useStoreContext()
    const { data: session, status } = useSession()

    console.log(session)
    if (session) {
        return (
            <>
                <Head>
                    <title>Профіль клієнта</title>
                </Head>

                <DashNav />
            </>
        )
    }
}
