import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import { useQuery } from "@apollo/client";
import {
  Typography,
  Avatar,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CircularProgress
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LabeledSwitch from "../../../components/labeled-switch";
import useStyles from "./styles";
import { useParams } from "react-router-dom";
import CardView from "../../../components/cardView";
import ErrorMessage from '../../../components/error-message';
import { GET_NOTIFICATIONS_BY_DAPP } from "../../../graphql/queries/getNotifications";

const queryLimit = 5;

export default function SelectNotifications(props) { 
  const classes = useStyles();
  const { dAppUuid } = useParams();
  const { error, data, loading, fetchMore } = useQuery(GET_NOTIFICATIONS_BY_DAPP, {
    variables: { 
      dAppUuid,
      offset: 0,
      limit: queryLimit
    },
  });

  // error message
  if (error) {
    const message = error.message;
    return <ErrorMessage message={message} />;
  }

  // loading data
  if (loading) {
    return <div className={classes.loadingWrapper} ><CircularProgress /></div>;
  }

  const { notifications, totalCount, dApp } = data.notifcationsByDApp;
  
  async function onPageChange(event, page) {
    fetchMore({
      variables: {
        offset: queryLimit * (page - 1)
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
      }
    })
  }

  return (
    <CardView>
      {notifications ? (
        <Grid
          container
          spacing={2}
          direction="column"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Avatar
              alt={dApp.name}
              src={dApp.logoUrl}
              className={classes.large}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="h5">
              {dApp.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="p">
              {dApp.description}
            </Typography>
          </Grid>
          
          {notifications ? (
            notifications.map((notification) => (
              <Grid item xs={12} key={notification.uuid} className={classes.notificationDetail}>
                <LabeledSwitch
                  title={notification.name}
                  onChange={props.handleChecked}
                  value={notification.uuid}
                />
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

          {
            totalCount &&
            <Pagination
              count={Math.ceil(totalCount / queryLimit)}
              color="primary"
              onChange={onPageChange}
              classes={{
                ul: classes.paginationBar
              }}
            />
          }

        </Grid>
      ) : (
        console.log(error)
      )}
    </CardView>
  );
}
