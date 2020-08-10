import React from 'react';
import { SELECTED_DAPP } from '../../../graphql/queries/getDapps';
import { useQuery } from '@apollo/client';
import { Typography,  Avatar, Button, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabeledSwitch from '../../../components/labeled-switch';
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { updateSelectedDapp,updateSelectedNotifications } from '../notification.slice';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { openSnackbar } from '../../../components/snackbar/snackbar.slice';
import CardView from '../../../components/cardView';

export default function SelectNotifications() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const { dAppUuid } = useParams();
  const checkedNotifications = [];  
  const { error, data } = useQuery(SELECTED_DAPP,{
    variables: { dAppUuid },
  });
 
  const handleChecked = (event) => {
    if (event.target.checked) {
      checkedNotifications.push(event.target.value);
    } else {
      checkedNotifications.pop(event.target.value);            
    } 
  };

  const handleNext = () => {
    if (checkedNotifications.length > 0) {
    dispatch(updateSelectedDapp(dAppUuid));
    dispatch(updateSelectedNotifications(checkedNotifications));
    history.push("/email")
    } else {
    dispatch(openSnackbar({ message: "Please subscribe to at least one notification.", type: "error" }));      
    }    
  }
    
  return (
    <CardView> 
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
            {data.dApps.description}
            </Typography> 
          </Grid>
            {data.dApps.Notifications ? data.dApps.Notifications.map( notification => (
              <Grid item xs={12} key={notification.uuid}>
                <LabeledSwitch title={notification.name} onChange={handleChecked} value={notification.uuid} />
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
              <Button variant="contained" color="primary" onClick ={()=>handleNext()}>
                Next
              </Button>
            </Grid>       
        </Grid>
        : console.log(error)      
      }
    </CardView>
  );
}
