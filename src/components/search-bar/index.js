import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

function SearchBar(props) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');

  function inputChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSearch(searchQuery);
  }

  return (
    <Paper component='form' onSubmit={handleSubmit} className={props.className || classes.root} >
      <InputBase
        className={classes.input}
        placeholder={props.placeHolder || ''}
        onChange={inputChange}
      />
      <IconButton className={classes.iconButton} aria-label='search' onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;