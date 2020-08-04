import React from 'react';
import { Typography,  Avatar, Button, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabeledSwitch from '../../../components/labeled-switch';
import useStyles from './confirm.styles';
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../notification.slice";
import { useHistory } from "react-router-dom";
import { useQuery ,useMutation } from '@apollo/client';
import { SELECTED_DAPP } from '../../../graphql/queries/getDappsQueries';
import {  SUBSCRIBE_NOTIFICATIONS } from '../../../graphql/mutations/subscribeNotificationsMutation';
import { openSnackbar } from '../../../components/snackbar/snackbar.slice';

export default function Confirm() {
    const classes = useStyles();
    const { selectedDapp, selectedNotifications,email } = useSelector(Notification);
    
    let history = useHistory();
    const dispatch = useDispatch();
    const dAppUuid = selectedDapp;
    const { error, data } = useQuery(SELECTED_DAPP,{
    variables: { dAppUuid },
    });
    const  subscribeNotificationsMutation = useMutation(SUBSCRIBE_NOTIFICATIONS); 

  const handleSubmit = () => {
    try {
        const [subscribeNotificcations, { data }] = subscribeNotificationsMutation;
        subscribeNotificcations({ variables: { email, dAppUuid,selectedNotifications } });
        dispatch(openSnackbar({message:  "Succeeded.Check your Inbox for more details.",type:"success"}))
        history.push("/");
    } catch (err) {
      dispatch(openSnackbar({ message: "Failed.Please try again.", type: "error" }));       
      }       
    }
    
    const isSelected = (notification) => {
        const index = selectedNotifications.indexOf(notification.uuid);
        const result = index > -1 ? true : false;
        return result;
    }

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
          <Grid item xs={12} >
            <Avatar alt={data.dApps.name} src={data.dApps.logoUrl} className={classes.large} />
          </Grid>
          <Grid item xs={12} >
            <Typography gutterBottom variant="h5" component="h5">
                {data.dApps.name}
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <Typography variant="body2" color="textSecondary" component="p">
             Please Verify Email and all other Informations.
            </Typography> 
           </Grid>
           <Grid item xs={12} >
            <Typography variant="body2" color="textSecondary" component="p">
             {email}
            </Typography> 
          </Grid>
            {data.dApps.Notifications ? data.dApps.Notifications.map( notification => (
              <Grid item xs={12} >
                    <LabeledSwitch title={notification.name} disabled={true} checked={isSelected(notification)}  value={notification.uuid} />
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
            )) : 
              <Grid item xs={12} >
                <Typography variant="body" color="textSecondary" component="p">
                    No notifications
                </Typography> 
              </Grid> 
            }  
            <Grid item xs={12} >
              <Button variant="contained" color="primary" onClick ={handleSubmit}>
                Submit
              </Button>
            </Grid>       
        </Grid>
        : console.log(error)      
      }
    </div>
  );
}
