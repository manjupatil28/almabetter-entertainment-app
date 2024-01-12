import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setTerm, searchShows } from '../features/data/dataSlice'

import SearchButton from '../assets/icon-search.svg'

function Search() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { searchTerm } = useSelector((state) => state.data)

  const onChange = (e) => {
    dispatch(setTerm(e.target.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(searchShows(searchTerm))
    navigate('/search')
  }

  return (
    <form className='search' onSubmit={onSubmit}>
      <button className='btn__search' title='Search'>
        <SearchButton />
      </button>
      <input
        className='input input__search heading-medium'
        type='text'
        value={searchTerm}
        placeholder='Search for movies or TV series'
        onChange={onChange}
      ></input>
    </form>
  )
}

export default Search
