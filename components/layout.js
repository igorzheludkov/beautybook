import s from './layout.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </Head>
      <div className={s.container}>
        <Navbar />
        <div className='padding-top'></div>
        <div className={s.content_wrapper}>{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  )
}
