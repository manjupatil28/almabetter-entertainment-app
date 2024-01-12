import React from 'react'
import { useSelector } from 'react-redux'

import ShowCards from './ShowCards'

function FilterdShows({ filterType, pageTitle }) {
  const { data } = useSelector((state) => state.data)

  return (
    <section className='show-grid'>
      <h1>{pageTitle}</h1>
      <div className='show-grid__shows'>
        <ShowCards data={data.filter((item) => item.category === filterType)} />
      </div>
    </section>
  )
}

export default FilterdShows
