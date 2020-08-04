import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './snackbar.styles';
import { Snackbar as SnackbarReducer, closeSnackbar } from "../snackbar/snackbar.slice";
import { useSelector,useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Snackbars() {
  const classes = useStyles();
  const { isOpen, type, message } = useSelector(SnackbarReducer);
  const dispatch = useDispatch();
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    dispatch(closeSnackbar());
  };

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}