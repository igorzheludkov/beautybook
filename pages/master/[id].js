import { useRouter } from 'next/router'

const MasterPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Майстер: {id}</p>
}

export default MasterPage