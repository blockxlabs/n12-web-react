import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    emailContainer: {
      textAlign: 'center'
  },  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

export default useStyles;