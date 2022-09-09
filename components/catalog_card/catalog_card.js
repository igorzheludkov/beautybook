import Avatar from './avatar'
import PersonalInfo from './personal_info'

export default function CatalogCard({ item }) {
  const user = item.userData
  const masterInfo = {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    padding: '10px',
    maxWidth: '340px',
  }
  console.log(item)
  return (
    <>
      <div style={masterInfo}>
        <Avatar w={100} h={100} src={user.photo} />
        <PersonalInfo
          props={[user.name, user.surname, user.categories, user.street, user.location, item._id, user.city]}
        />
      </div>
    </>
  )
}
