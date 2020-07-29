import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import useStyles from './styles';


const GET_DAPP = gql`
   query getDApp($uuid: String!) {
      dApps(uuid:$uuid) {
        uuid,
        name,
        description,
        logoUrl,
        Notifications{
          uuid
        }
    }
  }
`;


function DappDetail() {

  const { uuid } = useParams();

  // const classes = useStyles();
  const { loading, error, data, networkStatus } = useQuery(GET_DAPP, {
    variables: {
      uuid
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
     {
        data.dApps.name
     }
    </div>
  )
}

export default DappDetail;