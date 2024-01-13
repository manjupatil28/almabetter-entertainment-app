import React from 'react';

import Header from './Header';
import Search from './Search';

// Layout Component
function Layout(props) {
  // JSX structure for rendering Layout component
  return (
    <main>
      {/* Header component for the application */}
      <Header />

      {/* Main content layout with search and child components */}
      <div className='layout'>
        {/* Search component for searching shows */}
        <Search />

        {/* Render child components passed as props */}
        {props.children}
      </div>
    </main>
  );
}

// Export the Layout component
export default Layout;
