import React from 'react';
import { SELECTED_DAPP } from '../../../graphql/queries/getDappsQueries';
import { useQuery, useMutation } from '@apollo/client';
import { Typography, Avatar, Button, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabeledSwitch from '../../../components/labeled-switch';
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { updateSelectedDapp, updateSelectedNotifications } from '../notification.slice';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { openSnackbar } from '../../../components/snackbar/snackbar.slice';
import { GET_SUBSCRIPTIONS } from '../../../graphql/queries/getSubscriptions';
import { UNSUBSCRIBE_NOTIFICATIONS } from '../../../graphql/mutations/unsubscribeMutation';

export default function ManageSubscriptions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const { userUuid } = useParams();
  const checkedNotifications = {};
  const { error, data, loading } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { userUuid },
  });


  const [ unSubscribeNotifications, { error: UnsubError }] = useMutation(UNSUBSCRIBE_NOTIFICATIONS);

  const handleUnSubscribe = () => {
    // translate notification uuid to subscription uuid
    const subscriptionIds = [];
    data.getUserSubscriptions.map(item => {
      if (checkedNotifications[item.Notification.uuid]) {
        subscriptionIds.push(item.uuid);
      }
    });
    unSubscribeNotifications({ variables: { userNotifications: subscriptionIds } });
    history.push('/');
  }

  const onChange = (event) => {
    checkedNotifications[event.target.value] = !checkedNotifications[event.target.value];
  }

  if (loading) return <div>loading</div>
  if (error) return <div>error</div>

  if (Object.keys(data.getUserSubscriptions).length === 0) {
    dispatch(openSnackbar({ message: "No Active Subscription", type: "error" }));
    return <div>No Active Subscription</div>;
  } 
  const dApps = {};
  const email = data.getUserSubscriptions[0].User.email;
  data.getUserSubscriptions.map(item => {
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
            {/* <Grid item xs={12} >
              <Avatar alt={data.dApps.name} src={data.dApps.logoUrl} className={classes.large} />
            </Grid> */}
            {/* <Grid item xs={12} >
              <Typography gutterBottom variant="h5" component="h5">
                {data.dApps.name}
              </Typography>
            </Grid> */}
            <Grid item xs={12} >
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
                  <Grid item xs={12} key={notification.uuid}>
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
