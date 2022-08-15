import Image from 'next/image'
import s from './gallery.module.css'
import { useState } from 'react'

export default function GallerySlide({ data }) {
  const [fullView, setFullView] = useState('0')
  const [sliderPosition, setSliderPosition] = useState(0)
const slideWidth = 300
  function fullViewHandler(e) {
    switch (e.target.value) {
      case '1':
        {
          setFullView('1')
        }
        break
      case '0':
        {
          setFullView('0')
          setSliderPosition(0)
        }
        break
    }
  }

  function scrollHandler(e) {
    e.target.id === 'right' ? setSliderPosition(sliderPosition - slideWidth) :  setSliderPosition(sliderPosition + slideWidth)
  }

  const view = fullView === '1' ? { width: '300px', height: '300px' } : {width: '40px', height: '40px'}
  return (
    <div className={s.gallery_wrapper}>
      <div className={s.images}>
        <div className={s.images_wrapper} style={{transform: `TranslateX(${sliderPosition}px)`}}>
          {data.map((i) => (
            <div  key={i} className={s.images_container} style={view}>
              <button className={s.button_invisible} onClick={fullViewHandler} value='1' style={view}>
         
        </button>
              <Image
              
                style={{ borderRadius: '10px' }}
                layout='responsive'
                objectFit='cover'
                width={80}
                height={80}
                key={i}
                src={i}
                alt='service'
              />
            </div>
          ))}
        </div>
      </div>
      {fullView === '0' ? (
''
      ) : (
        <>
          <button className={s.gallery} onClick={fullViewHandler} value='0'>
            Згорнути фото
          </button>
          <button className={s.gallery} onClick={scrollHandler} id='left'>
            Ліворуч
          </button>
          <button className={s.gallery} onClick={scrollHandler} id='right'>
            Праворуч
          </button>
        </>
      )}
    </div>
  )
}
