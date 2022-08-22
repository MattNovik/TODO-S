import * as React from 'react';
import './index.scss';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
//import { debounce } from 'lodash';

function debounce(
  func: { (): void; apply?: any },
  timeout: number | undefined
) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const Search = ({ setSearchValue }) => {
  const [startType, setStartType] = useState(false);
  const searchFunc = () => {
    const searchData = (
      document.querySelector('.search-form input') as HTMLInputElement
    ).value.toLowerCase();
    setSearchValue(searchData);
  };
  const debouncedFunc = debounce(() => searchFunc(), 1000);
  return (
    <Paper
      onSubmit={(e: { preventDefault: () => void }) => {
        e.preventDefault();
        searchFunc();
      }}
      onInput={(e) => {
        let target = e.target as HTMLInputElement;
        debouncedFunc();
        if (target.value === '') {
          setStartType(false);
        }
      }}
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '300px',
        maxHeight: '40px',
        position: 'relative',
        transition: 'all .3s ease',
        '@media (max-width: 424px)': {
          width: '100%',
        },
      }}
      className={startType ? 'search-form search-form--start' : 'search-form'}
    >
      <InputBase
        className="search-form__input"
        sx={{
          ml: 1,
          flex: 1,
          p: '7px',
          m: '0',
        }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onInput={() => {
          if (!startType) {
            setStartType(true);
          }
        }}
      />
      <Close
        sx={{
          position: 'absolute',
          right: '40px',
          top: '50%',
          transform: 'translate(0, -50%)',
          color: 'rgba(0, 0, 0, 0.54)',
          cursor: 'pointer',
          borderRadius: '50%',
          padding: '7px',
          width: '38px',
          height: '100%',
          transition: 'all .3s ease',
          '&:hover, &:focus': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
        onClick={() => {
          setSearchValue(null);
          setStartType(false);
          (
            document.querySelector('.search-form input') as HTMLInputElement
          ).value = '';
        }}
        className="search-form__close"
      />
      <IconButton
        sx={{
          p: '7px',
          '&:hover, &:focus': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
        aria-label="search"
        type="submit"
      >
        <SearchIcon className="search-form__search-icon" />
      </IconButton>
    </Paper>
  );
};

export default Search;
