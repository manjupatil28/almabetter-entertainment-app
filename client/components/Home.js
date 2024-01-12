import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { reset } from '../features/data/dataSlice'

import Trending from './Trending'
import Recommended from './Recommended'

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reset())
  }, [])

  return (
    <section className='layout__home'>
      <Trending />
      <Recommended />
    </section>
  )
}

export default Home
