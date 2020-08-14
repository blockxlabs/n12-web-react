import React /*useState*/ from "react";
import {
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import CardView from "../../../components/cardView";

export default function Email(props) {
  const classes = useStyles();

  return (
    <CardView>
      <Container
        component="main"
        maxWidth="xs"
        className={classes.emailContainer}
      >
        <CssBaseline />
        <form className={classes.form} noValidate>
          <Typography gutterBottom variant="h5" component="h2">
            Where would you like to receive the notifications?
          </Typography>
          <TextField
            type="email"
            error={props.isEmailError}
            helperText={props.isEmailError ? "Invalid Email." : ""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={props.emailText}
            onChange={props.handleEmailChange}
          />
        </form>
      </Container>
    </CardView>
  );
}
