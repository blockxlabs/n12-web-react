import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './sign-in-form.styles';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN } from '../../../graphql/mutations/signInMutation'
import { useHistory } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        N12
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function SignIn() {
  const classes = useStyles();
  const [signIn, { data }] = useMutation(SIGN_IN);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);

   let history = useHistory();

   useEffect(() => {
     if (data) {
       const { login: { jwt } } = data;
       if (jwt) {
         //TODO: KHP Remove console log
         console.log('sign in done jwt',jwt);
         history.push("/")
       }
     }
  });

  const submitSignIn = (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      try {
      signIn({ variables: { email, password } });        
      } catch (err) {
        setIsEmailError(true);       
        setIsPasswordError(true);        
      }
    } else {
      if (email === '') {
        setIsEmailError(true);       
      }
      if(password ===''){
         setIsPasswordError(true);
      }
    }    
    setEmail('');
    setPassword('');
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>submitSignIn(e)}>
          <TextField
            error={isEmailError}
            helperText={isEmailError ?'Invalid Email.':''}
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            error={isPasswordError}
            helperText={isPasswordError ?'Invalid Password': ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}