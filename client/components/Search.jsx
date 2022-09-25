/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchFeed from './SearchFeed.jsx';
import axios from 'axios';
import {TextField, Box, Button} from '@mui/material';

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
    <>
       <Box
          sx={{
          margin: 'auto',
          marginTop: '50px',
          textAlign: 'center',
          border:'1px',
          borderColor: 'grey'
        }}
        >
          
      <form onSubmit={handleSearch}>
        <div className='searchBox'

        >
          <TextField
            InputProps={{ sx: { height: 40 } }}

            variant='outlined'
            type='text'
            placeholder='Search for a recipe...'
            onChange={handleChange}
            />
          <Button 
          type='submit'
          variant='contained'
          size='large'
          >
            <SearchIcon />
          </Button>
        </div>
      </form>
      <SearchFeed searchResults={searchResults}/>
      </Box>
    </>
  );
}

export default Search;
