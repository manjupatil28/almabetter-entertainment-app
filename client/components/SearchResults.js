import React from 'react';
import { useSelector } from 'react-redux';

import ShowCards from './ShowCards';

// SearchResults Component
function SearchResults() {
  // Retrieve data and search term from the Redux store
  const { data, searchTerm } = useSelector((state) => state.data);

  // JSX structure for rendering SearchResults component
  return (
    <section className='show-grid'>
      {/* Display search term in the heading */}
      <h1>{`Results for '${searchTerm}'`}</h1>

      {/* Display shows based on the data from the Redux store */}
      <div className='show-grid__shows'>
        {/* ShowCards component displaying search results */}
        <ShowCards data={data} />
      </div>
    </section>
  );
}

// Export the SearchResults component
export default SearchResults;
