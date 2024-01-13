import React from 'react';
import { useSelector } from 'react-redux';

import ShowCards from './ShowCards';

// BookmarkedShows Component
function BookmarkedShows() {
  // Retrieve user information from the Redux store
  const { user } = useSelector((state) => state.auth);

  // Retrieve data and bookmarks information from the Redux store
  const { data } = useSelector((state) => state.data);
  const { bookmarks } = useSelector((state) => state.bookmarks);

  // Extract titles from bookmarked shows
  const bookmarkTitles = bookmarks.map((bookmark) => bookmark.title);

  // Filter data based on bookmarked titles
  const filteredData = data.filter((item) =>
    bookmarkTitles.includes(item.title)
  );

  // JSX structure for rendering BookmarkedShows component
  return (
    <section className='show-grid'>
      {/* Header for BookmarkedShows */}
      <h1>Bookmarks</h1>

      {/* Display shows if the user is logged in */}
      {user && (
        <div className='show-grid__shows'>
          {/* ShowCards component displaying bookmarked shows */}
          <ShowCards data={filteredData} />
        </div>
      )}

      {/* Display login prompt if the user is not logged in */}
      {!user && (
        <div className='show-grid__shows'>
          <div className='account__footer'>
            <p>
              {/* Login link for users without an account */}
              Already have an account? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// Export the BookmarkedShows component
export default BookmarkedShows;
