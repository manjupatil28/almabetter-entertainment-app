import React from 'react'
import { useSelector } from 'react-redux'

import ShowCards from './ShowCards'

function SearchResults() {
  const { data, searchTerm } = useSelector((state) => state.data)

  return (
    <section className='show-grid'>
      <h1>{`Results for '${searchTerm}'`}</h1>
      <div className='show-grid__shows'>
        <ShowCards data={data} />
      </div>
    </section>
  )
}

export default SearchResults
