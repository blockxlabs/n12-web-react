
import React from 'react';
import { Typography, Avatar, Grid } from '@material-ui/core';

import useStyles from './styles';

export default function DisplayDApp({ dApp, titleTxt, email }) {

  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="flex-end"
      alignItems="center"
    >
      <Grid item xs={12} >
        <Avatar alt={dApp.name} src={dApp.logoUrl} className={classes.large}/>
      </Grid>
      <Grid item xs={12} >
        <Typography gutterBottom variant="h5" component="h5">
          {dApp.name}
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <Typography variant="body2" color="textSecondary" component="p">
          {titleTxt}
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <Typography variant="body2" color="textSecondary" component="p">
          {email}
        </Typography>
      </Grid>
      </Grid>
  )
}