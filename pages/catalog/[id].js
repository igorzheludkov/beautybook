import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from '../../styles/master.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { server } from '../../config/index'

export async function getServerSideProps(context) {
  console.log(process.env.NODE_ENV)
  const { id } = await context.query
  const res = await fetch(`${server}/api/getdata?q=${id}`, {
    method: 'GET',
  })
  const user = await res.json()

  return { props: { user } }
}

export default function MasterPage({ user }) {
  console.log(user.userData)
  return (
    <div className='container'>
      <div className={s.header}>
        <div className={s.avatar_container}>
          <div className={s.avatar_img_inner}>
            <Image
              className={s.avatar_img}
              placeholder='blur'
              blurDataURL='/images/userplaceholder.png'
              layout='responsive'
              objectFit='cover'
              width={150}
              height={150}
              src={user.userData.photo ? user.userData.photo : '/images/userplaceholder.png'}
              alt='avatar'
            />
          </div>
          <div className={s.social}>
            <Link href={user.userData.social_1}>
              <a target='_blank' className='social_link'>
                <Image width={30} height={30} src='/images/instagram.png' alt='instagram' />
              </a>
            </Link>
            <Link href={user.userData.social_2}>
              <a target='_blank' className='social_link'>
                <Image width={30} height={30} src='/images/telegram.png' alt='instagram' />
              </a>
            </Link>
            <Link href={`tel:${user.userData.phone}`}>
              <a className='social_link'>
                <Image width={30} height={30} src='/images/phone.png' alt='instagram' />
              </a>
            </Link>
          </div>
        </div>
        <div className={s.header_block}>
          <div>
            <div className={s.title}>{user.userData.name}</div>
            <div className={s.title}>{user.userData.surname}</div>
            <div className={s.spec}>{user.userData.specialization_1}</div>
            <div className={s.spec}>{user.userData.specialization_2}</div>
            <div className={s.spec}>{user.userData.specialization_3}</div>
          </div>
          <div className={s.about_me}>{user.userData.about_me}</div>
        </div>
      </div>
      <div className={s.adress_info}>
        <div className={s.info_a}>
          <div className={s.info_a_logo}><Image width={20} height={20} src='/images/adress.png' alt='instagram' /></div>
          <div className={s.info_a_text}>
            {user.userData.city}<br></br>{user.userData.street}<br></br>{user.userData.location}
          </div>
        </div>
        <div className={s.info_h}>
          <div className={s.info_h_logo}><Image width={20} height={20} src='/images/orders.png' alt='instagram' /></div>
          <div className={s.info_h_text}>{user.userData.work_begin}-{user.userData.work_end}</div>
        </div>
        <div className={s.info_b}>
          <div className={s.info_b_logo}><Image width={20} height={20} src='/images/bookmarks.png' alt='instagram' /></div>
          <div className={s.info_b_text}>Додати в закладки</div>
        </div>
      </div>
    </div>
  )
}

// const MasterPage = () => {
//   const router = useRouter()
//   const { id } = router.query

//   const [user, setUserData] = useState()

//   useEffect(() => {
//     id &&
//       fetch(`/api/getdata?q=${id}`, {
//         method: 'GET',
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data === null) {
//             console.log('user not found')
//           } else {
//             setUserData(data)
//             console.log('user data loaded')
//           }
//         })
//   }, [id])

//   console.log(user);

//   return (
//     <>
//       {user && (
//         <>
//           <div className={s.profile}>
//             <div className={s.avater}>
//               <Image width={130} height={130} src='/images/userplaceholder.png' alt='avatar' />
//             </div>
//             <div>
//               <div className={s.title}>{user.userData.name}</div>
//               <div className={s.title}>{user.userData.surname}</div>
//               <div className={s.spec}>{user.userData.specialization_1}</div>
//               <div className={s.spec}>{user.userData.specialization_2}</div>
//               <div className={s.spec}>{user.userData.specialization_3}</div>

//             </div>
//           </div>
//         </>
//       )}
//     </>
//   )
// }

// export default MasterPage
