import React from 'react';
import { Card } from '@material-ui/core';
import useStyles from './styles';

export default function CardView(props) {

  const classes = useStyles();
  
  return (
    <Card className={props.className || classes.cardContainer}>
      {props.children}
    </Card>
  );

}

