/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchFeed from './SearchFeed.jsx';
import axios from 'axios';

const { RECIPES_API_ID} = process.env;
const {RECIPES_API_KEY } = process.env;

function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

const handleSearch = async (e) => {
  e.preventDefault();
  console.log('searching');
 const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${RECIPES_API_ID}&app_key=${RECIPES_API_KEY}`)
  console.log(response.data.hits);
  setSearchResults(response.data.hits);
};

const handleChange = (e) => {
  setQuery(e.target.value);
};

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className='searchBox'>
          <input
            className='searchInput'
            type='text'
            placeholder='Search for a recipe...'
            onChange={handleChange}
          />
          <button type='submit'>
            <SearchIcon />
          </button>
        </div>
      </form>
      <SearchFeed searchResults={searchResults}/>
    </div>
  );
}

export default Search;
