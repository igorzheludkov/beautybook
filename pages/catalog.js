import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { server } from '../config/index'
import useSWR from 'swr'
import CatalogCard from '../components/catalog_card/catalog_card'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
    const { data: allusers } = useSWR(`/api/getall`, fetcher)

    if (!allusers) return <div>Loading</div>
    
    allusers && console.log(allusers);

    return (
        <div className={styles.container}>
            <Head>
                <title>BeautyBook</title>
                <meta name='description' content="Каталог майстрів сфери краси та здоров'я" />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            {allusers.user.map((i) => (
                <div key={i._id}><CatalogCard  item={i} /></div>
              
            ))}

           
        </div>
    )
}
