import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { images } from '../hooks/imageImport'
import {
  createBookmark,
  deleteBookmark,
} from '../features/bookmark/bookmarkSlice'

import BookmarkEmpty from '../assets/icon-bookmark-empty.svg'
import BookmarkFull from '../assets/icon-bookmark-full.svg'
import Movie from '../assets/icon-category-movie.svg'
import Tv from '../assets/icon-category-tv.svg'
import Play from '../assets/icon-play.svg'

function TrendingCards() {
  const dispatch = useDispatch()

  const { data } = useSelector((state) => state.data)
  const { user } = useSelector((state) => state.auth)
  const { bookmarks } = useSelector((state) => state.bookmarks)
  const trending = data.filter((show) => show.isTrending === true)

  // Set array of bookmark titles
  const bookmarkTitles = bookmarks.map((bookmark) => bookmark.title)

  const onAddBookmark = (showName) => {
    dispatch(createBookmark({ title: showName }))
  }

  const onDeleteBookmark = (id) => {
    dispatch(deleteBookmark(id))
  }

  const renderedCards = trending.map((title) => {
    const imgPath = title.thumbnail.trending.large
    const imgSrc = images[imgPath.replace('./assets/', '')]
    const id = bookmarks.filter((bookmark) => bookmark.title === title.title)

    return (
      <div className='card card--trending' key={title.title}>
        {user && bookmarkTitles.includes(title.title) && (
          <button
            className='btn__bookmark btn__bookmark--trending'
            onClick={() => onDeleteBookmark(id[0]._id)}
          >
            <BookmarkFull />
          </button>
        )}
        {user && !bookmarkTitles.includes(title.title) && (
          <button
            className='btn__bookmark btn__bookmark--trending'
            onClick={() => onAddBookmark(title.title)}
          >
            <BookmarkEmpty />
          </button>
        )}
        <button className='btn btn--play'>
          <span className='btn--play__icon btn--play__icon--trending'>
            <Play />
            <h4>Play</h4>
          </span>
          <span className='card--trending__info'>
            <p>
              {title.year}
              <span className='card__dot'></span>
              {title.category === 'Movie' ? <Movie /> : <Tv />}
              {title.category}
              <span className='card__dot'></span>
              {title.rating}
            </p>
            <h3>{title.title}</h3>
          </span>
          <img src={imgSrc.default} alt={title.title} />
        </button>
      </div>
    )
  })

  return <>{renderedCards}</>
}

export default TrendingCards
