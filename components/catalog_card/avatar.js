import Image from 'next/image'

export default function Avatar({ w, h, src }) {
  let styles = {
    width: w,
    height: h,
  }

  return (
    <div style={styles}>
      <Image
        style={{ borderRadius: '50%' }}
        layout='responsive'
        objectFit='cover'
        width={w}
        height={h}
        src={src ? src : '/images/userplaceholder.png'}
        alt='avatar'
      />
    </div>
  )
}
