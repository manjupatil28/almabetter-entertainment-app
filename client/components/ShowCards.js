import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { images } from '../hooks/imageImport';
import {
  createBookmark,
  deleteBookmark,
} from '../features/bookmark/bookmarkSlice';

import BookmarkEmpty from '../assets/icon-bookmark-empty.svg';
import BookmarkFull from '../assets/icon-bookmark-full.svg';
import Movie from '../assets/icon-category-movie.svg';
import Tv from '../assets/icon-category-tv.svg';
import Play from '../assets/icon-play.svg';

// ShowCards Component
function ShowCards({ data }) {
  // Redux hooks for dispatching actions and accessing state
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookmarks } = useSelector((state) => state.bookmarks);

  // Mapping over the provided data to render individual show cards
  const renderedCards = data.map((title) => {
    const imgPath = title.thumbnail.regular.small;
    const imgSrc = images[imgPath.replace('./assets/', '')];
    const id = bookmarks.filter((bookmark) => bookmark.title === title.title);

    // Set array of bookmark titles
    const bookmarkTitles = bookmarks.map((bookmark) => bookmark.title);

    // Function to add a bookmark
    const onAddBookmark = (showName) => {
      dispatch(createBookmark({ title: showName }));
    };

    // Function to delete a bookmark
    const onDeleteBookmark = (id) => {
      dispatch(deleteBookmark(id));
    };

    return (
      <div className='card card--show' key={title.title}>
        {/* Display full bookmark icon for bookmarked shows */}
        {user && bookmarkTitles.includes(title.title) && (
          <button
            className='btn__bookmark btn__bookmark--show'
            onClick={() => onDeleteBookmark(id[0]._id)}
          >
            <BookmarkFull />
          </button>
        )}
        {/* Display empty bookmark icon for non-bookmarked shows */}
        {user && !bookmarkTitles.includes(title.title) && (
          <button
            className='btn__bookmark btn__bookmark--show'
            onClick={() => onAddBookmark(title.title)}
          >
            <BookmarkEmpty />
          </button>
        )}

        {/* Play button for the show */}
        <button className='btn btn--play'>
          <span className='btn--play__icon btn--play__icon--show'>
            <Play />
            <h4>Play</h4>
          </span>
          <img src={imgSrc.default} alt={title.title} />
        </button>

        {/* Show information section */}
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
    );
  });

  // JSX structure for rendering ShowCards component
  return <>{renderedCards}</>;
}

// Export the ShowCards component
export default ShowCards;
