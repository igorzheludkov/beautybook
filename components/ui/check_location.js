import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import s from './check_location.module.css'

export default function CheckLocation({ data, handler, state }) {
  const [geoList, setGeoList] = useState([])
  const [settlement, setSettlement] = useState([])

  const initialSettlement = { id: '21000', url: 'vinnytsia', type: 'м', name: 'Вінниця' }
  const [selectedSettlement, setSelectedSettlement] = useState(initialSettlement)

  function settlementHandler(e) {
    setSelectedSettlement(settlement.find((i) => i.id === e.target.value))
    setSettlement([])
    setGeoList([])
  }

  useEffect(() => {
    handler({ target: { id: 'city', value: selectedSettlement.id } })
  }, [selectedSettlement])
  

useEffect(() => {
  () => {
   const region = Object.values(data).find(e => e.settlement.find((i) => i.url === state )) ?? data[0]
   const city = region.settlement.find(e => e.url === state) ?? region.settlement[0]

   setSelectedSettlement(city)
  }
 
}, [])


  return (
    <div className={s.wrapper}>
      <div className={s.city} onClick={() => setGeoList(data)}>
        <div className={s.city__title}>
          {selectedSettlement.type}. {selectedSettlement.name}
        </div>
        <Image src={'/images/dropdown.png'} width={20} height={20} alt='dropdown' />
      </div>
      <div className={s.setsettlement}>
        <div className={s.geolist}>
          {geoList.map((i) => (
            <div className={s.oblname} key={i.obl_name}>
              <div onClick={() => setSettlement(i.settlement)}>{i.obl_name}</div>
            </div>
          ))}
        </div>

        <div className={s.settlement}>
          {settlement.map((i) => (
            <button className={s.settl_item} key={i.id} onClick={settlementHandler} value={i.id}>
              {i.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
