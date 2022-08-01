import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from '../../styles/master.module.css'
import Image from 'next/image'
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
  console.log(user)
  return (
    <div>
      <div  className={s.header}>
        <div className={s.avatar}>
          <Image width={150} height={150} src='/images/userplaceholder.png' alt='avatar' />
        </div>
        <div className={s.block}>
          <div className={s.title}>{user.userData.name}</div>
          <div className={s.title}>{user.userData.surname}</div>
          <div className={s.spec}>{user.userData.specialization_1}</div>
          <div className={s.spec}>{user.userData.specialization_2}</div>
          <div className={s.spec}>{user.userData.specialization_3}</div>
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
