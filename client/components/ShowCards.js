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

function ShowCards({ data }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { bookmarks } = useSelector((state) => state.bookmarks)

  const renderedCards = data.map((title) => {
    const imgPath = title.thumbnail.regular.small
    const imgSrc = images[imgPath.replace('./assets/', '')]
    const id = bookmarks.filter((bookmark) => bookmark.title === title.title)

    // Set array of bookmark titles
    const bookmarkTitles = bookmarks.map((bookmark) => bookmark.title)

    const onAddBookmark = (showName) => {
      dispatch(createBookmark({ title: showName }))
    }

    const onDeleteBookmark = (id) => {
      dispatch(deleteBookmark(id))
    }

    return (
      <div className='card card--show' key={title.title}>
        {user && bookmarkTitles.includes(title.title) && (
          <button
            className='btn__bookmark btn__bookmark--show'
            onClick={() => onDeleteBookmark(id[0]._id)}
          >
            <BookmarkFull />
          </button>
        )}
        {user && !bookmarkTitles.includes(title.title) && (
          <button
            className='btn__bookmark btn__bookmark--show'
            onClick={() => onAddBookmark(title.title)}
          >
            <BookmarkEmpty />
          </button>
        )}
        <button className='btn btn--play'>
          <span className='btn--play__icon btn--play__icon--show'>
            <Play />
            <h4>Play</h4>
          </span>
          <img src={imgSrc.default} alt={title.title} />
        </button>
        <div className='card--show__info'>
          <p className='font-small'>
            {title.year}
            <span className='card__dot'></span>
            {title.category === 'Movie' ? <Movie /> : <Tv />}
            {title.category}
            <span className='card__dot'></span>
            {title.rating}
          </p>
          <h4>{title.title}</h4>
        </div>
      </div>
    )
  })
  return <>{renderedCards}</>
}

export default ShowCards
