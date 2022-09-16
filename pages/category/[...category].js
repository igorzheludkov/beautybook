// import clientPromise from '../../lib/mongodb'
import { CheckboxPublicButtons } from '../../components/ui/checkboxbuttons'
import { server } from '../../config/index'
import s from '../../styles/category.module.css'
import CheckLocation from '../../components/ui/check_location'
import Catalog from '../catalog'
import RadioCard from '../../components/ui/radioCard'
import { HScrollWrapper } from '../../components/wrappers/horizontalScrollWrapper'
import {
  Image,
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useRadioGroup,
  getRootProps,
  getRadioProps,
  RadioGroup,
  HStack
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Link from 'next/link'

import { useState, useEffect, useMemo, useCallback } from 'react'

export default function Category({ location, poslugi, geo, category }) {
  // category array is retrieved from router.query object
  const categoryData = poslugi.find((i) => i.url === category[0])

  const initialRequestState = { category: categoryData.id, city: '21000' }
  const initialFilterState = { subCategory: '', location: '' }

  const [filter, setFilter] = useState(initialFilterState)
  const [request, setRequest] = useState(initialRequestState)
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  console.log(filter)
  const options = {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  useEffect(() => {
    const result = results.filter(
      (e) =>
        e.userData.categories.includes(filter.subCategory) && e.userData.work_place.includes(filter.location)
    )
    setFilteredResults(result)
  }, [filter])

  console.log(filter)
  console.log(filteredResults)
  async function filterUsers() {
    const response = await fetch(`/api/getall`, options)
    const data = await response.json()
    setResults(data.user)
    setFilteredResults(data.user)
  }

  useEffect(() => {
    filterUsers()
  }, [])

  function filterHandler(e) {
    setFilter({ ...filter, [e.target.id]: e.target.value })
  }
  function requestHandler(e) {
    setRequest({ ...request, [e.target.id]: e.target.value })
  }

  return (
    <>
      <div className={s.heading}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {categoryData.main_name}
          </MenuButton>
          <MenuList>
            {poslugi.map((e) => (
              <MenuItem key={e.id} minH='48px'>
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  fallbackSrc='https://via.placeholder.com/150'
                  src={`${server}${e.pic}`}
                  alt={e.main_name}
                  mr='12px'
                />
                <Link href={e.url}>
                  <a>{e.main_name}</a>
                </Link>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <CheckLocation geo={geo} handler={requestHandler} />
      </div>

      <Box my={2}>
        <CheckboxPublicButtons
          data={categoryData.serv_types}
          handler={filterHandler}
          boxType={'radio'}
          type='subCategory'
          checkStatus={filter.subCategory}
        />
      </Box>
      <Box mb={2}>
        <CheckboxPublicButtons
          data={[...location]}
          handler={filterHandler}
          boxType={'radio'}
          type='location'
          checkStatus={filter.location}

        />
      </Box>

      {results.length > 0 && <Catalog data={filteredResults} />}
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/db_services`, {
    method: 'GET'
  })
  const data = await res.json()
  // const client = await clientPromise
  // await client.connect()
  const { query } = context
  // const filter = id.includes('@') ? { email: id } : { _id: ObjectId(id) }
  // const filterServ = id.includes('@') ? { owner: id } : { owner_id: id }

  try {
    // const uResponse = await client.db('beautybook').collection('user_public').findOne(filter)
    // const uData = JSON.stringify(uResponse)
    // const sResponse = await client.db('beautybook').collection('user_services').find(filterServ).toArray()
    // const uServ = JSON.stringify(sResponse)
    // await client.close()
    return { props: { isConnected: true, ...query, ...data } }
  } catch (e) {
    return {
      props: { isConnected: false }
    }
  }
}
