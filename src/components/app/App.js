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
import Dapps from '../../domain/dapps/list-dapps';

import useStyles from './App.styles';
import { useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

// uncomment for redux
import { useSelector } from "react-redux";


import { SEARCH_INPUT_QUERY } from '../../graphql/queries/submitSearchInputQueries';
import { GET_DAPPS_INFO, SEARCH_DAPPS_INFO } from '../../graphql/queries/getDappsQueries';

import SelectNotifications from '../../domain/notification/select-notifications'

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  // uncomment for redux
  const { searchInputSubmit } = useSelector(state => state.searchForm);

  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
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

              <SearchForm />
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
              <ListItem button component={Link} to={'/reports'} onClick={handleDrawerClose}>
                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                <ListItemText primary={'Reports'} />
              </ListItem>
            </List>
            <Divider />
          </Drawer>
        </div>
        <Container maxWidth="md">
          <Route path="/reports" render={() => {
            return (<div>REPORT</div>)
          }} />
          <Route path='/dapps' component={Dapps}></Route>
          <Route path="/selectNotifications/:dAppUuid" render={() => {
            return (<div><SelectNotifications /></div>)
          }} />
        </Container>

    </div>
    {/* </SearchInputProvider> */}
    {/* </HistoryToggleProvider> */}
    </Router>
  );
}