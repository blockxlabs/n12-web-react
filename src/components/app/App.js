import React from 'react';
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core';
import PrimaryMenuAppBar from '../menu';
import Dapps from '../../domain/dapps/list-dapps';

import useStyles from './App.styles';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import SelectNotifications from '../../domain/notification/select-notifications'
import Confirm from '../../domain/notification/confirm';
import Email from '../../domain/notification/email';
import ManageSubscriptions from '../../domain/notification/manage-subscriptions';
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
              <Route path="/select-notifications/:dAppUuid" component={SelectNotifications} />
              <Route path="/email" component={Email} ></Route>
              <Route path="/confirm" component={Confirm}></Route>
              <Route path="/manage-subscriptions/:userUuid" component={ManageSubscriptions}></Route>
              {/* Keep it last  */}
              <Route path="/" component={Dapps}></Route>
            </Switch>
          </Container>
        </div>
        <Snackbar />
    </Router>
  );
}