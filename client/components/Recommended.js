import React from 'react';
import { useSelector } from 'react-redux';

import ShowCards from './ShowCards';

// Recommended Component
function Recommended() {
  // Retrieve data from the Redux store
  const { data } = useSelector((state) => state.data);

  // JSX structure for rendering Recommended component
  return (
    <section className='show-grid'>
      {/* Title for the Recommended section */}
      <h1>Recommended for you</h1>

      {/* Display shows based on the data from the Redux store */}
      <div className='show-grid__shows'>
        {/* ShowCards component displaying recommended shows */}
        <ShowCards data={data} />
      </div>
    </section>
  );
}

// Export the Recommended component
export default Recommended;
