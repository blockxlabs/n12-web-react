import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  titleWrapper: { textAlign: 'center', marginTop: 100, marginBottom: 100 },
  cardLogo: { height: 100, backgroundSize: "auto" },
  loadingWrapper: { display: 'flex', justifyContent: 'center', marginTop: 200 }
}));

export default useStyles; 