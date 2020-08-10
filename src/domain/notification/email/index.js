import React, { useState } from 'react';
import {Container,CssBaseline,TextField,Button, Typography} from '@material-ui/core';
import useStyles from './styles';
import { useDispatch,useSelector } from "react-redux";
import { updateEmail } from '.././notification.slice';
import { useHistory } from "react-router-dom";
import { Notification } from "../notification.slice";
import CardView from '../../../components/cardView';

export default function Email() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const{ email } = useSelector(Notification);
  const [emailText, setEmail] = useState(email||'');
  const [isEmailError, setIsEmailError] = useState(false);
  let history = useHistory();  
    
  const handleNext = (e) => {
    e.preventDefault();
    if (emailText !== '') {
      try {
        dispatch(updateEmail(emailText));  
        history.push("/confirm")     
      } catch (err) {
        setIsEmailError(true);       
      }
    } else {
      if (emailText === '') {
        setIsEmailError(true);       
      }
    }    
    setEmail('');        
    }
    return (
      <CardView>
        <Container component="main" maxWidth="xs" className={classes.emailContainer}>
          <CssBaseline />
          <form className={classes.form} noValidate>
            <Typography gutterBottom variant="h5" component="h2">
              Where would you like to receive the notifications?
                </Typography>
            <TextField
              type="email"
              error={isEmailError}
              helperText={isEmailError ? 'Invalid Email.' : ''}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailText}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleNext} >
              Next
            </Button>
          </form>
        </Container>
      </CardView>
    );
}