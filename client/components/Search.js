import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setTerm, searchShows } from '../features/data/dataSlice';

import SearchButton from '../assets/icon-search.svg';

// Search Component
function Search() {
  // Redux hooks for dispatching actions and accessing state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm } = useSelector((state) => state.data);

  // Function to handle input changes
  const onChange = (e) => {
    // Dispatch action to set the search term
    dispatch(setTerm(e.target.value));
  }

  // Function to handle form submission
  const onSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Dispatch action to search shows with the current search term
    dispatch(searchShows(searchTerm));

    // Navigate to the search results page
    navigate('/search');
  }

  // JSX structure for rendering Search component
  return (
    <form className='search' onSubmit={onSubmit}>
      {/* Search button */}
      <button className='btn__search' title='Search'>
        <SearchButton />
      </button>

      {/* Input field for entering search term */}
      <input
        className='input input__search heading-medium'
        type='text'
        value={searchTerm}
        placeholder='Search for movies or TV series'
        onChange={onChange}
      ></input>
    </form>
  );
}

// Export the Search component
export default Search;
