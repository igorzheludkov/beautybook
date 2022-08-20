import Image from 'next/image'

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
        background: '#eeeeee'
      }}
      onClick={onClick}
    >
      <Image src='/images/orders.png' width={10} height={10} alt='booking' />
      <span>{children}</span>
    </button>
  )
}
