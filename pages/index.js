import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import s from '../styles/index.module.css'
import { signIn } from 'next-auth/react'
import { server } from '../config/index'
import CategoriesCard from '../components/blocks/categories_card'
import Wrapper from '../components/wrappers/wrapper'

export default function Landing({ data }) {
  return (
    <>
      <Head>
        <title>Каталог краси</title>
      </Head>
      <div className={s.hero}>Знайти потрібного спеціаліста просто</div>
      <div className={s.bullet}>Оберіть категорію</div>
      <div className={s.bullet}>Підберіть майстра</div>
      <div className={s.bullet}>Забронюйте візит прямо на сайті</div>
      <Wrapper>
        {data.poslugi.map((i) => (
          <CategoriesCard key={i.id} data={i} />
        ))}
      </Wrapper>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/db_services`, {
    method: 'GET',
  })
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}
