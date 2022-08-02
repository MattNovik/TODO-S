import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 300,
        maxHeight: '40px',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, p: '7px', m: '0' }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton sx={{ p: '7px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
