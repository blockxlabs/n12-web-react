import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Typography, Button, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, CircularProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabeledSwitch from '../../../components/labeled-switch';
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { openSnackbar } from '../../../components/snackbar/snackbar.slice';
import { GET_SUBSCRIPTIONS } from '../../../graphql/queries/getSubscriptions';
import { UNSUBSCRIBE_NOTIFICATIONS } from '../../../graphql/mutations/unsubscribeNotifications';
import ErrorMessage from '../../../components/error-message';

export default function ManageSubscriptions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const { userUuid } = useParams();
  const checkedNotifications = {};
  const { error, data, loading } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { userUuid },
  });


  const [unSubscribeNotifications] = useMutation(UNSUBSCRIBE_NOTIFICATIONS, {
    onCompleted() {
      dispatch(openSnackbar({ message: "Succeeded. Notification Unsubscribed.", type: "success" }));
      history.push('/');
    },
    onError(e) {
      dispatch(openSnackbar({ message: "Unable to complete the request please try again", type: "error" }));
    }
  });

  const handleUnSubscribe = () => {
    // translate notification uuid to subscription uuid
    const subscriptionIds = [];
    data.UserSubscriptions.forEach(item => {
      if (checkedNotifications[item.Notification.uuid]) {
        subscriptionIds.push(item.uuid);
      }
    });
    if (subscriptionIds.length) {
      unSubscribeNotifications({ variables: { userNotifications: subscriptionIds } });
    } else {
      dispatch(openSnackbar({ message: "Please select at least one subscription", type: "error" }));
    }
  };

  const onChange = (event) => {
    checkedNotifications[event.target.value] = !checkedNotifications[event.target.value];
  };

  // loading data
  if (loading) {
    return <div className={classes.loadingWrapper} ><CircularProgress /></div>;
  }

  // error message
  if (error) {
    const message = error.message;
    return <ErrorMessage message={message} />;
  }

  // No Active Subscription
  if (Object.keys(data.UserSubscriptions).length === 0) {
    const message = "No Active Subscription";
    dispatch(openSnackbar({ message, type: "error" }));
    return <ErrorMessage message={message} />;
  }

  const dApps = {};
  const [userSubscription] = data.UserSubscriptions;
  const email = userSubscription.User.email;
  
  data.UserSubscriptions.forEach(item => {
    if (!dApps[item.dAppUuid]) {
      dApps[item.dAppUuid] = {
        dApp: item.DApp,
        notifications: []
      }
    }
    checkedNotifications[item.Notification.uuid] = false;
    dApps[item.dAppUuid].notifications.push(item.Notification);
  });

  return (
    <div>
      {
        data ?
          <Grid
            container
            spacing={2}
            direction="column"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={12} className={classes.headerWraper}>
              <Typography variant="body2" color="textSecondary" component="p">
                Please select the notifications to unsubscribe
            </Typography>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="body2" color="textSecondary" component="p">
                {email}
              </Typography>
            </Grid>
            {

              Object.values(dApps).map(dApp => {

                return dApp.notifications.map(notification => (
                  <Grid item xs={12} key={notification.uuid} className={classes.notificationDetail}>
                    <LabeledSwitch
                      title={`${dApp.dApp.name} ${notification.name}`}
                      value={notification.uuid}
                      onChange={onChange}
                    />
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>{notification.shortDescription}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          {notification.longDescription}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                ))

              })
            }
            <Grid item xs={12} >
              <Button variant="contained" color="primary" onClick={handleUnSubscribe}>
                UnSubscribe
              </Button>
            </Grid>
          </Grid>
          : console.log(error)
      }
    </div>
  );
}