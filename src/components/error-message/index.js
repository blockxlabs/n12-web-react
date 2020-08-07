import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

function ErrorMessage({ message }) {
  const classes = useStyles();

  return (
    <div className={classes.mainWrapper}>
      <Typography variant='h3' gutterBottom={true}> {message} </Typography>
      <Typography variant='h4' gutterBottom={true}>Please try again or return to the <a href={'/'}>home page</a>.</Typography>
    </div>
  )
}

export default ErrorMessage;