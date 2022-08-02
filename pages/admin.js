import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import s from '../styles/login.module.css'
import { getSession } from "next-auth/react";
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
      data: 'user data'
    },
  }
}

export default function Admin({user, data}) {

  console.log(user);
  return (
    <>
      <Head>
        <title>Admin Profile</title>
      </Head>
      <h1>Admin</h1>
      
    </>
  )
}


