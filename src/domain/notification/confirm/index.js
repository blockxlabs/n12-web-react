import React from "react";
import {
  Typography,
  Avatar,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LabeledSwitch from "../../../components/labeled-switch";
import useStyles from "./styles";
import CardView from "../../../components/cardView";

export default function Confirm(props) {
  const classes = useStyles();

  return (
    <CardView>
      {props.data ? (
        <Grid
          container
          spacing={2}
          direction="column"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Avatar
              alt={props.data.dApps.name}
              src={props.data.dApps.logoUrl}
              className={classes.large}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="h5">
              {props.data.dApps.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="p">
              Please Verify Email and all other Informations.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.email}
            </Typography>
          </Grid>
          {props.displayNotifications && props.displayNotifications.length ? (
            props.displayNotifications.map((notification) => (
              <Grid item xs={12} key={notification.uuid} className={classes.notificationDetail}>
                <LabeledSwitch title={notification.name} checkedSwitch={true} />
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      {notification.shortDescription}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>{notification.longDescription}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body" color="textSecondary" component="p">
                No notifications
              </Typography>
            </Grid>
          )}
        </Grid>
      ) : (
        console.log(props.error)
      )}
    </CardView>
  );
}
