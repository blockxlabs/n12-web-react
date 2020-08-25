import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
 large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  notificationDetail: {
    width: 'inherit'
  },
  paginationBar: {
    justifyContent: 'center',
    marginTop: 10
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 100
  }
}));

export default useStyles;