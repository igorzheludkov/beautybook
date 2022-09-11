// import clientPromise from '../../lib/mongodb'
import { CheckboxPublicButtons } from '../../components/ui/checkboxbuttons'
import { server } from '../../config/index'
import s from '../../styles/category.module.css'
import CheckLocation from '../../components/ui/check_location'

export default function Category(props) {
  console.log(props)

  const categoryData = props.poslugi.find((i) => i.url === props.category[0])
  console.log(categoryData)

  function filterHandler(e) {
    console.log(e.target.value)
  }

  return (
    <>
      <div className={s.heading}>
        <h1 className={s.title_h2}>{categoryData.main_name}</h1>
        <CheckLocation geo={props.geo} handler={filterHandler} />
      </div>
      <p className={s.p}>Вид послуги</p>

      <CheckboxPublicButtons data={categoryData.serv_types} handler={filterHandler} />
      <p className={s.p}>Місце надання послуги</p>
      <CheckboxPublicButtons data={[...props.location]} handler={filterHandler} />
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/db_services`, {
    method: 'GET',
  })
  const data = await res.json()
  // const client = await clientPromise
  // await client.connect()
  const { query } = context
  // const filter = id.includes('@') ? { email: id } : { _id: ObjectId(id) }
  // const filterServ = id.includes('@') ? { owner: id } : { owner_id: id }

  try {
    // const uResponse = await client.db('beautybook').collection('user_public').findOne(filter)
    // const uData = JSON.stringify(uResponse)
    // const sResponse = await client.db('beautybook').collection('user_services').find(filterServ).toArray()
    // const uServ = JSON.stringify(sResponse)
    // await client.close()
    return { props: { isConnected: true, ...query, ...data } }
  } catch (e) {
    return {
      props: { isConnected: false },
    }
  }
}
