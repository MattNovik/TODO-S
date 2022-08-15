import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
/* import { createTheme } from '@mui/system';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 424,
      sm: 767,
      md: 1023,
      lg: 1200,
      xl: 1439,
    },
  },
}); */

export default function Search() {
  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 300,
        maxHeight: '40px',
        '@media (max-width: 424px)': {
          width: '100%',
        },
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
