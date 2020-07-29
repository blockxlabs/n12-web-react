import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
 root: {
    maxWidth: 345,
  },
 media: {
      width:35
    },
 large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default useStyles;