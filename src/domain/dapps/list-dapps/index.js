import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import { ALL_DAPPS } from '../../../graphql/queries/getDappsQueries'
import Loading from '../../../components/loading';

function Dapps() {

  const classes = useStyles();
  const history = useHistory();
  const { loading, error, data } = useQuery(ALL_DAPPS);

  const viewDetail = (dapp) => {
    history.push("/selectNotifications/" + dapp.uuid);
  };

  const renderEachDapp = (dapp) => {

    return (
      <Grid item xs={6} sm={4}>
        <Card>
          <CardActionArea onClick={() => viewDetail(dapp)}>
            <CardMedia
              className={classes.cardLogo}
              image={dapp.logoUrl}
              title={`${dapp.name} Logo`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {dapp.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {dapp.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  if (error) {
    const message = error.message;
    return (
      <Loading message={message} />
    );
  }

  if (loading) {
    return <div className={classes.loadingWrapper} ><CircularProgress /></div>;
  }

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Typography variant='h3' gutterBottom={true}> All DApps </Typography>
        <Typography variant='h4' gutterBottom={true}>to stay in the know of the blockchain systems</Typography>
      </div>

      {loading && <div className={classes.loadingWrapper} ><CircularProgress /></div>}
      
      {
        data && <Grid container spacing={3}>
          {
            data.allDApps.map(dapp => {
              return renderEachDapp(dapp);
            })
          }
        </Grid>
      }
    </div>
  )
}

export default Dapps; 