import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import DisplayDapp from '../../../components/display-dapp';
import ListNotifications from '../../../components/list-notifications';
import { GET_SUBSCRIPTIONS } from '../../../graphql/queries/getSubscriptions';


export default function ManageNotifications() {
  const classes = useStyles();
  const history = useHistory();
  const { dAppUuid, userUuid } = useParams();
  const { error, data, loading } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { dAppUuid, userUuid }
  });

  const handleUnsubscribe = () => {
    history.push("/");
  }

  if (loading) return <div>loading</div>
  if (error) return <div>error</div>

  const dApp = data.getUserSubscriptions[0].DApp;
  const notifications = data.getUserSubscriptions.map(item => {
    return { ...item.Notification, disabled: true, selected: true };
  });
  const email = data.getUserSubscriptions[0].User.email;

  return (
    <div>
      <div className={classes.dappInfo}>
        <DisplayDapp dApp={dApp} titleTxt={'Unsubscribe those notifications'} email={email} />
      </div>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="flex-end"
        alignItems="center"
      >

        {notifications ? 
          <ListNotifications notifications={notifications}/>
          :
            <Grid item xs={12} >
              <Typography variant="body" color="textSecondary" component="p">
                  No notifications
              </Typography>
            </Grid>
        }

        <Grid item xs={12} >
          <Button variant="contained" color="primary" onClick={handleUnsubscribe}>
            Unsubscribe
         </Button>
        </Grid>
      
      </Grid>
    </div>
  );
}
