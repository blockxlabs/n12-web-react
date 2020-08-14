import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
 large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  notificationDetail: {
    width: 'inherit'
  }
}));

export default useStyles;