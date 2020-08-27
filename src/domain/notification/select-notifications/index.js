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
import { SELECTED_DAPP } from "../../../graphql/queries/getDapps";
import SearchBar from "../../../components/search-bar";

const eachPage = 5;

export default function SelectNotifications(props) {
  const classes = useStyles();
  const { dAppUuid } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNotifications, setFiteredNotifications] = useState([]);
  const { error, data, loading } = useQuery(SELECTED_DAPP, {
    variables: {
      dAppUuid
    },
    onCompleted: (result) => {
      setFiteredNotifications(result.dApps.Notifications);
    }
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

  async function onPageChange(event, page) {
    setCurrentPage(page);
  }

  async function onSearch(searchQuery) {
    const result = data.dApps.Notifications.filter(noti => {
      return (noti.name.match(new RegExp(searchQuery, 'i')));
    });
    setFiteredNotifications(result);
    setCurrentPage(1);
  }

  function renderNotifications() {
    const offset = (currentPage - 1) * eachPage;
    const notifications = filteredNotifications.slice(offset, offset + eachPage);
    if (notifications && notifications.length > 0) {
      return notifications.map((notification) => (
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
    } else {
      return (
        <Grid item xs={12}>
          <Typography variant="body" color="textSecondary" component="p">
            No notifications
              </Typography>
        </Grid>
      );
    }
  }

  return (
    <CardView>
      {data ? (
        <Grid
          container
          spacing={2}
          direction="column"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Avatar
              alt={data.dApps.name}
              src={data.dApps.logoUrl}
              className={classes.large}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="h5">
              {data.dApps.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.dApps.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SearchBar placeHolder={'Notification Name'} onSearch={onSearch} />
          </Grid>
          {
            renderNotifications()
          }

          {
            (filteredNotifications.length > 0) ?
              <Pagination
                page={currentPage}
                count={Math.ceil(filteredNotifications.length / eachPage)}
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