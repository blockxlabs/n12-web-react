import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginRight: 0,
    marginLeft: 0,
    paddingLeft: 16,
    paddingRight: 16
  },
  label: {
    marginRight: 'auto'
  },
  checked: {
    color: green[500],
    minHeight: 38
  }
}));

export default useStyles;