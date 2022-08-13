import Head from 'next/head'
import Link from 'next/link'
import s from '../../styles/firststeps.module.css'
import {signIn } from 'next-auth/react'
import MasterNav from '../../components/masternav'


export default function Login() {

  return (
    <>
      <Head>
        <title>Перші кроки</title>
      </Head>
      <MasterNav  />
      <h1>Перші кроки</h1>
      
    </>
  )
}
