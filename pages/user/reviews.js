import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import s from '../../styles/reviews.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'
import { server } from '../../config/index'
import ScrollBox from '../../components/scrollbox'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { useStoreContext } from '../../context/store'


export default function Reviews() {
    const [store, setStore] = useStoreContext()
console.log(store.masterInfo);

return(
    <>
    
    </>
)
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