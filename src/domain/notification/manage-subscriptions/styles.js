import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginTop: 100,
  },

  headerWraper: {
    marginTop: 100
  },

  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100
  }
}));

export default useStyles;