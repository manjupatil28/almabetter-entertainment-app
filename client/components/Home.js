import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { reset } from '../features/data/dataSlice';

import Trending from './Trending';
import Recommended from './Recommended';

// Home Component
function Home() {
  // Redux hook for dispatching actions
  const dispatch = useDispatch();

  // useEffect to dispatch the 'reset' action when the component mounts
  useEffect(() => {
    dispatch(reset());
  }, []);

  // JSX structure for rendering Home component
  return (
    <section className='layout__home'>
      {/* Component displaying trending shows */}
      <Trending />

      {/* Component displaying recommended shows */}
      <Recommended />
    </section>
  );
}

// Export the Home component
export default Home;
