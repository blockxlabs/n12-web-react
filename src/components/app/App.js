import React, { Fragment, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AssessmentIcon from '@material-ui/icons/Assessment';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import SearchForm from '../../domain/search/search-form';
import PrimaryMenuAppBar from '../menu';
import ResultsGridList from '../result-tiles';

//  uncomment for Context
// import HistoryToggleProvider, {HistoryToggleContext} from '../../context/history-toggle-context';
// import SearchInputProvider, {SearchInputContext} from '../../context/search-input-context';

import useStyles from './App.styles';
import { useTheme } from '@material-ui/core/styles';
import { BrowserRouter as  Router, Switch, Link, Route } from 'react-router-dom';

// uncomment for redux
import { useSelector } from "react-redux";

import { SEARCH_INPUT_QUERY } from '../../graphql/queries/submitSearchInputQueries';
import { GET_DAPPS_INFO, SEARCH_DAPPS_INFO } from '../../graphql/queries/getDappsQueries';

import { useQuery } from '@apollo/react-hooks';

import SignIn from '../../domain/user/sign-in-form';
import SignUp from '../../domain/user/sign-up-form';

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  // uncomment for redux
  const {searchInputSubmit} = useSelector(state => state.searchForm);

  // uncomment for apollo client
  // const { data } = useQuery(SEARCH_INPUT_QUERY);
  // console.log("data", data)
  // const { data: dappsInfo, error: errorDappsInfo, loading: loadingDappsInfo } = useQuery(GET_DAPPS_INFO);
  // console.log("dappsInfo", dappsInfo)
  // const { data: sDappsInfo, error: errorSDappsInfo, loading: loadingSDappsInfo } = useQuery(SEARCH_DAPPS_INFO, {
  //   variables: { q: "a" },
  // });
  // console.log("sDappsInfo", sDappsInfo)

  const [open, setOpen] = React.useState(false);

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
  <Switch>
    {/* <HistoryToggleProvider> */}
    {/* <SearchInputProvider> */}
    <div className={classes.grow}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={handleDrawerOpen}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
              <Typography className={classes.title} variant="h6" noWrap >
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                  N12
                </Link>
              </Typography>

                <SearchForm/>
            <div className={classes.grow} />
            <PrimaryMenuAppBar />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
            <List>
              <ListItem button component={Link} to={'/reports'}  onClick={handleDrawerClose}>
                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                <ListItemText primary={'Reports'} />
              </ListItem>
            </List>
          {/* </Router> */}

          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Drawer>
      </div>
      {/* <Router> */}
      <Container maxWidth="md">
        <Route exact={true} path={["/", "/search"]} render={() => {
          return(
            <Fragment>
              {/* <HistoryToggleContext.Consumer>
                {(historyContext) => {
                  console.log("APP", historyContext);
                  return (
                  <div>Is history on? {historyContext.historyToggle.toString()} </div>
                  )
                }}
              </HistoryToggleContext.Consumer> */}
              {/* <div>Is history on? {historyContext.historyToggle.toString()} </div> */}
              {
                <div>
                  
                  {/* uncomment for redux */}
                  {searchInputSubmit.map((entry, index) =>
                    <div key={index}>{entry}</div>
                  )}

                  {/* uncomment for apollo client  */}
                  {/* {data.searchInputs.map(searchInput => <div>{searchInput.searchText}</div>)} */}
                  {/* {loadingDappsInfo ? <div> Loading </div> : dappsInfo.dapps.map(dapp => <div>{dapp.name} {dapp.description}</div>)} */}
  
                </div>
              }

              {/* <ResultsGridList/> */}
            </Fragment>
          )
        }}/>

        <Route path="/reports" render={()=>{
          return(<div>REPORT</div>)
          }} />
        <Route path="/signin" render={()=>{
          return(<SignIn/>)
            }} />
        <Route path="/signup" render={()=>{
          return(<SignUp/>)
        }}/>
      </Container>

    </div>
    {/* </SearchInputProvider> */}
        {/* </HistoryToggleProvider> */}
    </Switch>
</Router>
  );
}
