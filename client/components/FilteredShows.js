import React from 'react';
import { useSelector } from 'react-redux';

import ShowCards from './ShowCards';

// FilteredShows Component
function FilteredShows({ filterType, pageTitle }) {
  // Retrieve data from the Redux store
  const { data } = useSelector((state) => state.data);

  // JSX structure for rendering FilteredShows component
  return (
    <section className='show-grid'>
      {/* Dynamic page title based on the prop */}
      <h1>{pageTitle}</h1>

      {/* Display shows based on the specified filter type */}
      <div className='show-grid__shows'>
        {/* ShowCards component displaying filtered shows */}
        <ShowCards data={data.filter((item) => item.category === filterType)} />
      </div>
    </section>
  );
}

// Export the FilteredShows component
export default FilteredShows;
