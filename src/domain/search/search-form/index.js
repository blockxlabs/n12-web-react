
import React, { useState, useEffect, memo, Fragment } from 'react';

// import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { Query } from '@apollo/react-components';

// import SearchIcon from '@material-ui/icons/Search';

// uncomment for context
// import {SearchInputContext} from '../../../context/search-input-context';
// import {HistoryToggleContext} from '../../../context/history-toggle-context';

// uncomment for Redux
import { useSelector, useDispatch } from "react-redux";
import { addSearchInput } from "./search-form.slice";

// import custom state hooks
import useStyles from './search-form.styles';

import { useQuery } from '@apollo/react-hooks';
import { SEARCH_LIKE_DAPPS_INFO, ALL_DAPPS } from '../../../graphql/queries/getDappsQueries';

// uncomment for apollo client
// import { ADD_SEARCH_INPUT_MUTATION } from '../../../graphql/mutations/submitSearchInputMutation';
// import { GET_HISTORY_TOGGLE } from '../../../graphql/queries/historyToggleQueries';

const Message = () => {
  // uncomment for redux
  const message = useSelector(state => state.searchForm.message);
  const historyToggle = useSelector(state => state.historyMenu.historyToggle);

  // the text will render to a random color for
  // each instance of the Message component

  // uncomment for apollo state management
  // const historyToggle = useQuery(GET_HISTORY_TOGGLE)

  useEffect(() => { 
    // do stuff 
    console.log('Colour Change');    
  }, [historyToggle]);

  const getColor = () => (Math.floor(Math.random() * 255))
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`
  }
  return (
    // uncomment for redux
    // <div>
    //   <h4 style={style}>{message}</h4>
    // </div>
    <div>
      <h4 style={style}>{"TEST"}</h4>
    </div>
  )
}
const MemoizedMessage = memo(Message);

const SearchForm = () =>  { 
  const classes = useStyles();
  
  // uncomment for context
  // const [searchValue, setSearchValue] = useState(null);
  // const { setSearchResult } = useContext(SearchInputContext);
  // const historyContext = useContext(HistoryToggleContext);

  // uncomment for redux
  const dispatch = useDispatch();
  const historyToggle = useSelector(state => state.historyMenu.historyToggle);

  // uncomment for apollo client
  // const [addSearchInput] = useMutation(ADD_SEARCH_INPUT_MUTATION, { variables: { searchInput:  } })

  // uncomment for apollo client
  // const handleSearchOnChange = (event, addSearchInput)=>{
  
  // redux handling
  const handleSearchOnChange = (event)=>{
    if(event.key === "Enter"){

      // uncomment for Context context 
      // console.log("Search");
      // console.log(event.target.value);
      // setSearchValue(event.target.value)
      // console.log(historyContext.historyToggle);
      // if(historyContext.historyToggle){
      //   addSearchInput(event.target.value);
      // }
      // trigger effect

      // uncomment for redux
      if( historyToggle ){
        dispatch(addSearchInput(event.target.value));
      }

      // uncomment for apollo client
      // console.log('addSearchInput', addSearchInput)
      // addSearchInput({ variables: {searchInputSubmit : { searchText: event.target.value }} })
    }
  }

  const [open, setOpen] = useState(false);

  return (
  <Fragment>
    <div className={classes.search}>
    {/* <div className={classes.searchIcon}>
      <SearchIcon />
    </div> */}
    
    {/* uncomment for apollo client
      <Mutation mutation={ADD_SEARCH_INPUT_MUTATION}>
      {(addSearchInput, { data }) => ( */}

    {/* uncomment for apollo client */}
    <Query query={ALL_DAPPS}>
      {({ loading, error, data }) => 
        <Autocomplete
          id="asynchronous-demo"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          variant="filled"
          size="small"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          // filterOptions={filterOptions}
          options={loading ? [] : data ? data.allDApps : []   }
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="filled"
              size="small"
              onKeyPress={e=>{
                // uncomment for apollo store management
                // handleSearchOnChange(e, addSearchInput);

                // uncomment for redux
                handleSearchOnChange(e);
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      }
    </Query>
    </div>
    <MemoizedMessage/>
  </Fragment>
  )
}

export default SearchForm;