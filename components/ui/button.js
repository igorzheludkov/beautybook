import Image from 'next/image'
import Link from 'next/link'

export const BookingButton = ({ children, onClick }) => {
  return (
    <button
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        width: 105,
        fontSize: 12,
        alignItems: 'center',
        justifyItems: 'center',
        padding: 0,
        height: 30,
        borderRadius: 5,
        border: 'none',
        background: '#eeeeee',
      }}
      onClick={onClick}
    >
      <Image src='/images/orders.png' width={10} height={10} alt='booking' />
      <span>{children}</span>
    </button>
  )
}
export const EditButton = ({ children, onClick, id }) => {
  return (
    <button
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        width: 105,
        fontSize: 12,
        alignItems: 'center',
        justifyItems: 'center',
        padding: 0,
        height: 30,
        borderRadius: 5,
        border: 'none',
        background: '#eeeeee',
      }}
      onClick={onClick}
    >
      <Image src='/images/orders.png' width={10} height={10} alt='booking' />
      <span>
        <Link href={`/user/services/${id}`}>
          <a>{children}</a>
        </Link>
      </span>
    </button>
  )
}

export const DefaultButton = ({ value, onClick, id }) => {
  return (
    <a
      href={`/user/services/`}
      style={{
        fontSize: 12,
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        margin: '2px',
        height: 25,
        borderRadius: 8,
        border: 'none',
        background: '#E1F4FF',
      }}
      onClick={onClick}
    >
      {value.short_name}
    </a>
  )
}
