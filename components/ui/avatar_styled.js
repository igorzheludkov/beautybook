import Image from 'next/image'
import _JSXStyle from 'styled-jsx/style'

export default function Avatar({ width, height, src }) {
  return (
    <>
      <div className='avatar'>
        <Image
          style={{ borderRadius: '50%' }}
          layout='responsive'
          objectFit='cover'
          width={width ?? 50}
          height={height ?? 50}
          src={src ? src : '/images/userplaceholder.png'}
          alt='avatar'
        />
      </div>
      <_JSXStyle id='123'>{`
          div.avatar {
            min-width: ${width}px;      
            min-height: ${height}px;
            margin-right: 5px; 
        }
      `}</_JSXStyle>
    </>
  )
}
