import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { server } from '../config/index'

export async function getServerSideProps() {
    const res = await fetch(`${server}/api/getall`)
    const allUsers = await res.json()
    return {
        props: {
            data: allUsers,
        },
    }
}

export default function Home({ data }) {
    if (data) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>BeautyBook</title>
                    <meta name='description' content="Каталог майстрів сфери краси та здоров'я" />
                    <link rel='icon' href='/favicon.ico' />
                </Head>

                {data.user.map((i) => (
                    <h1 key={i._id} className={styles.title}>
                         Page of <Link href={`/catalog/${i._id}`}>
                           <a>{i.email}</a>
                        </Link>
                    </h1>
                ))}

                <footer className={styles.footer}>
                    <a href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' target='_blank' rel='noopener noreferrer'>
                        Powered by{' '}
                        <span className={styles.logo}>
                            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
                        </span>
                    </a>
                </footer>
            </div>
        )
    }
}
