import React from 'react'

import TrendingCards from './TrendingCards'

import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
//Trending Component
function Trending() {
  const scrollRef = useHorizontalScroll()

  return (
    <section className='trending'>
      <h1>Trending</h1>
      <div ref={scrollRef} className='trending__shows'>
        <TrendingCards />
      </div>
    </section>
  )
}

export default Trending
