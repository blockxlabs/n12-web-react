
import React from 'react';
import { Typography, Grid, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabeledSwitch from '../labeled-switch';

export default function ListNotifications({ notifications }) {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="flex-end"
      alignItems="center"
    >
      {
        notifications.map(notification => (
          <Grid item xs={12} >
            <LabeledSwitch 
              title={notification.name} 
              disabled={notification.disabled} 
              checked={notification.checked} 
              value={notification.uuid} 
            />
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography >{notification.shortDescription}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {notification.longDescription}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        ))
      }
    </Grid>
  );

}