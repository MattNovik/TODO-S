import * as React from 'react';
import './index.scss';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Close } from '@mui/icons-material';
import { useState } from 'react';

export default function Search({
  smallBoardList,
  setSmallBoardList,
  boardList,
}) {
  const [startType, setStartType] = useState(false);

  return (
    <Paper
      onSubmit={(e) => {
        e.preventDefault();
        const searchData = document
          .querySelector('.search-form input')
          .value.toLowerCase();
        setSmallBoardList(
          boardList.filter(
            (item) =>
              item.nameItem.toLowerCase().includes(searchData) ||
              item.description.toLowerCase().includes(searchData)
          )
        );
        console.log(smallBoardList);
      }}
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 300,
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
        sx={{
          ml: 1,
          flex: 1,
          p: '7px',
          m: '0',
        }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onInput={(e) => {
          if (!startType) {
            setStartType(true);
          }
        }}
        className="search-form__input"
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
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
        onClick={(e) => {
          setSmallBoardList(boardList);
          setStartType(false);
          document.querySelector('.search-form input').value = '';
        }}
        className="search-form__close"
      />
      <IconButton sx={{ p: '7px' }} aria-label="search" type="submit">
        <SearchIcon className="search-form__search-icon" />
      </IconButton>
    </Paper>
  );
}
