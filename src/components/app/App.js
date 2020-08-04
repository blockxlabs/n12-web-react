import React from 'react';
import {AppBar, Toolbar, Container, Typography} from '@material-ui/core';

import PrimaryMenuAppBar from '../menu';
import Dapps from '../../domain/dapps/list-dapps';

import useStyles from './App.styles';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import SelectNotifications from '../../domain/notification/select-notifications'
import Confirm from '../../domain/notification/confirm';
import Email from '../../domain/notification/email';
import ManageNotifications from '../../domain/notification/manage-notifications'
import Snackbar from "../snackbar";

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.grow}>
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap >
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                  N12
                </Link>
              </Typography>

              <div className={classes.grow} />
              <PrimaryMenuAppBar />
            </Toolbar>
          </AppBar>
        </div>
        <Container maxWidth="md">
          <Switch>
            <Route path="/reports" render={() => {
              return (<div>REPORT</div>)
            }} />
            <Route path="/selectNotifications/:dAppUuid" render={() => {
              return (<div><SelectNotifications /></div>)
            }} />
            <Route path="/email" component={Email} ></Route>
            <Route path="/confirm" component={Confirm}></Route>
            <Route path="/manage-subscription/:userUuid/:dAppUuid" component={ManageNotifications}></Route>
             
            {/* Keep it last  */}
            <Route path="/" component={Dapps}></Route>
            
          </Switch>
        </Container>
       
    </div>
    {/* </SearchInputProvider> */}
    {/* </HistoryToggleProvider> */}
    <Snackbar />
    </Router>
  );
}