// import clientPromise from '../../lib/mongodb'

export async function getServerSideProps(context) {
  // const client = await clientPromise
  // await client.connect()
  const { id } = context.query
  console.log(context)
  // const filter = id.includes('@') ? { email: id } : { _id: ObjectId(id) }
  // const filterServ = id.includes('@') ? { owner: id } : { owner_id: id }

  // try {
  //   const uResponse = await client.db('beautybook').collection('user_public').findOne(filter)
  //   const uData = JSON.stringify(uResponse)
  //   const sResponse = await client.db('beautybook').collection('user_services').find(filterServ).toArray()
  //   const uServ = JSON.stringify(sResponse)
  //   // await client.close()
  //   return { props: { isConnected: true, user: uData, services: uServ } }
  // } catch (e) {
  //   return {
  //     props: { isConnected: false },
  //   }
  // }
}

export default function Category(props) {
  return <></>
}
