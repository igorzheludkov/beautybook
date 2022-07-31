import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from '../../styles/master.module.css'
import Image from 'next/image'
import { server } from '../../config/index'

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/getall?q=all`, {
    method: 'GET',
  })
  const users = await res.json()

  return { props: { users } }
}

export default function AllUsers({ users }) {
  console.log(users.user)
  return (
    <div>
      <p>Something</p>
      {users.user.map((i) => (
        <>
          <div className={s.profile}>
            <div className={s.avater}>
              <Image width={130} height={130} src='/images/userplaceholder.png' alt='avatar' />
            </div>
            <div>
              <div className={s.title}>{i._id}</div>
              <div className={s.title}>{i.email}</div>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}
