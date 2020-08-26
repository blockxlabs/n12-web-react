import React, { useState } from "react";
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
import SearchBar from "../../../components/search-bar";

const queryLimit = 5;

export default function SelectNotifications(props) { 
  const classes = useStyles();
  const { dAppUuid } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { error, data, loading, fetchMore, refetch } = useQuery(GET_NOTIFICATIONS_BY_DAPP, {
    variables: { 
      dAppUuid,
      offset: 0,
      limit: queryLimit
    },
    fetchPolicy: "cache-and-network"
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

  const { notifications, totalCount, dApp } = data.notificationsByDApp;
  
  async function onPageChange(event, page) {
    setCurrentPage(page);
    fetchMore({
      variables: {
        offset: queryLimit * (page - 1)
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
      }
    })
  }

  async function onSearch(searchQuery) {
    setCurrentPage(1);
    refetch({
      dAppUuid,
      searchQuery,
      offset: 0,
      limit: queryLimit
    });
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
          <Grid item xs={12}>
            <SearchBar placeHolder={'Notification Name'} onSearch={onSearch} />
          </Grid>
          {(notifications && notifications.length > 0) ? (
            notifications.map((notification) => (
              <Grid item xs={12} key={notification.uuid} className={classes.notificationDetail}>
                <LabeledSwitch
                  title={notification.name}
                  onChange={props.handleChecked}
                  value={notification.uuid}
                  checked={props.checkedNotifications[notification.uuid]}
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
            (totalCount && totalCount > 0) ?
            <Pagination
              page={currentPage}
              count={Math.ceil(totalCount / queryLimit)}
              color="primary"
              onChange={onPageChange}
              classes={{
                ul: classes.paginationBar
              }}
            /> : null
          }

        </Grid>
      ) : (
        console.log(error)
      )}
    </CardView>
  );
}
