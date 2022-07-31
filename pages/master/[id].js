import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const MasterPage = () => {
  

  const router = useRouter()
  const { id } = router.query

  return <p>Майстер: {id}</p>
}

export default MasterPage
