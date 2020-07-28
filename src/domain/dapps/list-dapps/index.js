import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';


const GET_ALL_DAPPS = gql`
  query {
    allDApps{
      uuid,
      name,
      description,
      logoUrl,
      Notifications{
        uuid,
        name
      }
    }
  }
`;


function Dapps() {

  const classes = useStyles();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ALL_DAPPS); 

  const viewDetail = (dapp) => {
    history.push("/dapp/" + dapp.uuid);
  }

  const renderEachDapp = (dapp) => {

    return (
      <Grid item xs={6} sm={4}>
        <Card>
          <CardActionArea onClick={() => viewDetail(dapp)}>
            <CardMedia
              className={classes.cardLogo}
              image={dapp.logoUrl}
              title="Dapp Logo"
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
  }

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Typography variant='h3' gutterBottom={true}> All DApps </Typography>
        <Typography variant='h4' gutterBottom={true}>to stay in the know of the blockchain systems</Typography>
      </div>
      <Grid container spacing={3}>
          {
            data.allDApps.map(dapp => {
              return renderEachDapp(dapp);
            })
          }
      </Grid>
    </div>
  )
}

export default Dapps;