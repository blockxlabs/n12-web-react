
import React from 'react';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography >{notification.shortDescription}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {notification.longDescription}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))
      }
    </Grid>
  );

}