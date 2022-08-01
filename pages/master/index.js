import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { getSession } from 'next-auth/react'
import s from '../../styles/login.module.css'
import dash from '../../styles/dashboard.module.css'
import DashNav from '../../components/dashnav'
import MasterNav from '../../components/masternav'


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
  return (
    <>
      <Head>
        <title>Профіль майстра</title>
      </Head>
      <DashNav/>
      <MasterNav path='/master/'/>
    </>
  )
}
