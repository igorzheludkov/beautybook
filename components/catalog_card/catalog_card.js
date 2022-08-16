import Avatar from './avatar'
import PersonalInfo from './personal_info'

export default function CatalogCard({ item }) {
  const user = item.userData
  console.log(item)
  const masterInfo = {
    display: 'flex',
    padding: '10px',
  }

  return (
    <>
      <div style={masterInfo}>
        <Avatar w={100} h={100} src={user.photo} />
        <PersonalInfo props={[user.name, user.surname, user.categories, user.street, user.location, user.userId]} />
      </div>
    </>
  )
}
