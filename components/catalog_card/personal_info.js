import Link from 'next/link'
import Image from 'next/image'

export default function PersonalInfo({ props }) {
  const global = {
    paddingLeft: '10px',
  }
  const nameStyle = {
    fontWeight: '600',
    fontSize: '18px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  }
  const specStyle = {
    fontSize: '14px',
    color: '#3F3F3F',
    marginBottom: '10px',
  }
  const streetStyle = {
    fontSize: '12px',
    color: '#3F3F3F',
  }
  const locationStyle = {
    fontSize: '12px',
    color: '#3F3F3F',
  }
  return (
    <div style={global}>
      <div style={nameStyle}>
        <Link href={`/${props[5]}`}>
          <a>
            {props[0]} {props[1]}
          </a>
        </Link>
      </div>
      <div style={specStyle}>
        {props[2].map((i) => (
          <span style={{ marginRight: '10px' }} key={i}>
            {i}
          </span>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Image src='/images/adress.png' width={15} height={15} alt='navicon'/>
        </div>
        <div style={{paddingLeft: '5px'}}>
          <div style={streetStyle}>{props[6]}</div>
          <div style={streetStyle}>{props[3]}</div>
          <div style={locationStyle}>{props[4]}</div>
        </div>
      </div>
    </div>
  )
}
