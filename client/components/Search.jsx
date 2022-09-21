/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../context/AppContext.jsx';
import SearchFeed from './SearchFeed.jsx';

function Search() {
  const { searchResults, searchRecipes } = useContext(AppContext);
  const { register, handleSubmit } = useForm(); // register watches input for changes https://react-hook-form.com/get-started
  const onSubmit = (data, e) => {
    // form data and event
    // submit handler
    searchRecipes(data);
    e.target.reset(); // clear input after search
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='searchBox'>
          <input
            className='searchInput'
            type='text'
            name=''
            placeholder='Search'
            {...register('query')}
          />
          <button className='searchButton' href='#'>
            <SearchIcon />
          </button>
        </div>
      </form>
      <SearchFeed />
    </div>
  );
}

export default Search;
