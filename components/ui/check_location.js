import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CheckLocation({ geo, handler }) {
  const [geoList, setGeoList] = useState([])
  const [settlement, setSettlement] = useState([])
  const [selectedSettlement, setSelectedSettlement] = useState({ id: '01000', type: 'м', name: 'Київ' })

  function settlementHandler(e) {
    setSelectedSettlement(settlement.find((i) => i.id === e.target.value))
    setSettlement([])
    setGeoList([])
  }

  useEffect(() => {
    handler({ target: { value: 'city', id: selectedSettlement.id } })
  }, [selectedSettlement, handler])
const cityCheckStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
} 
  return (
    <div>
      <div style={cityCheckStyle} onClick={() => setGeoList(geo)}>
        <div>{selectedSettlement.type}. {selectedSettlement.name}</div>
        <Image src={'/images/dropdown.png'} width={20} height={20} alt='dropdown' />
      </div>
      {geoList.map((i) => (
        <div key={i.obl_name}>
          <div onClick={() => setSettlement(i.settlement)}>{i.obl_name}</div>
        </div>
      ))}
      <div>
        {settlement.map((i) => (
          <button key={i.id} onClick={settlementHandler} value={i.id}>
            {i.name}
          </button>
        ))}
      </div>
    </div>
  )
}
