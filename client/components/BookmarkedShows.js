import React from 'react'
import { useSelector } from 'react-redux'

import ShowCards from './ShowCards'

function BookmarkedShows() {
  const { user } = useSelector((state) => state.auth)
  const { data } = useSelector((state) => state.data)
  const { bookmarks } = useSelector((state) => state.bookmarks)
  const bookmarkTitles = bookmarks.map((bookmark) => bookmark.title)
  const filteredData = data.filter((item) =>
    bookmarkTitles.includes(item.title)
  )

  return (
    <section className='show-grid'>
      <h1>Bookmarks</h1>
      {user && (
        <div className='show-grid__shows'>
          <ShowCards data={filteredData} />
        </div>
      )}
      {!user && (
        <div className='show-grid__shows'>
          <div className='account__footer'>
            <p>
              Already have an account? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default BookmarkedShows
