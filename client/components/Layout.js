import React from 'react'

import Header from './Header'
import Search from './Search'

function Layout(props) {
  return (
    <main>
      <Header />
      <div className='layout'>
        <Search />
        {props.children}
      </div>
    </main>
  )
}

export default Layout
