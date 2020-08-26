import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Typography, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import Email from "../notification/email";
import SelectNotification from "../notification/select-notifications";
import Confirm from "../notification/confirm";
import {
  updateSelectedDapp,
  updateSelectedNotifications,
  Notification,
  updateEmail,
} from "../notification/notification.slice";
import { openSnackbar } from "../../components/snackbar/snackbar.slice";
import { SUBSCRIBE_NOTIFICATIONS } from "../../graphql/mutations/subscribeNotifications";
import { SELECTED_DAPP } from "../../graphql/queries/getDapps";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
  },
}));

function getSteps() {
  return ["Select notification", "Enter notification details", "Confirm"];
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { dAppUuid } = useParams();
  const [checkedNotifications, updateCheckedNotifications] = useState({});
  const dispatch = useDispatch();
  const { email, selectedNotifications /*selectedDapp*/ } = useSelector(
    Notification
  );
  // const dAppUuid = selectedDapp;
  const [emailText, setEmail] = useState(email || "");
  const [isEmailError, setIsEmailError] = useState(false);
  const { error, data } = useQuery(SELECTED_DAPP, {
    variables: { dAppUuid },
  });
  let history = useHistory();

  const handleEventsChecked = (event) => {
    const newState = { ...checkedNotifications };
    if (newState[event.target.value]) {
      delete newState[event.target.value];
    } else {
      newState[event.target.value] = true;
    }
    updateCheckedNotifications(newState);

  };

  const subscribeNotificationsMutation = useMutation(SUBSCRIBE_NOTIFICATIONS, {
    onCompleted() {
      dispatch(updateEmail(""));
      dispatch(updateSelectedNotifications([]));
      dispatch(
        openSnackbar({
          message: "Succeeded. Check your Inbox for more details.",
          type: "success",
        })
      );
      history.push("/");
    },
  });
  const [
    subscribeNotifications,
    { error: subscribeNotificationsError },
  ] = subscribeNotificationsMutation;

  const isSelected = (notification) => {
    const index = selectedNotifications.indexOf(notification.uuid);
    const result = index > -1 ? true : false;
    return result;
  };

  const displayNotifications = (data && data.dApps && data.dApps.Notifications)
    ? data.dApps.Notifications.filter((item) => {
        return selectedNotifications.indexOf(item.uuid) > -1;
      })
    : [];

  if (subscribeNotificationsError) {
    dispatch(
      openSnackbar({ message: "Failed. Please try again.", type: "error" })
    );
  }

  const handleNext = (e) => {
    e.preventDefault();
    switch (activeStep) {
      case 0:
        if (Object.keys(checkedNotifications).length > 0) {
          dispatch(updateSelectedDapp(dAppUuid));
          dispatch(updateSelectedNotifications(Object.keys(checkedNotifications)));
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          dispatch(
            openSnackbar({
              message: "Please subscribe to at least one notification.",
              type: "error",
            })
          );
        }
        break;
      case 1:
        if (emailText !== "") {
          try {
            dispatch(updateEmail(emailText));
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } catch (err) {
            setIsEmailError(true);
          }
        } else {
          if (emailText === "") {
            setIsEmailError(true);
          }
        }
        setEmail("");
        break;
      case 2:
        subscribeNotifications({
          variables: { email, dAppUuid, selectedNotifications },
        });
        break;
      default:
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectNotification handleChecked={handleEventsChecked} checkedNotifications={checkedNotifications} />;
      case 1:
        return (
          <Email
            emailText={emailText}
            handleEmailChange={(e) => setEmail(e.target.value)}
            isEmailError={isEmailError}
          />
        );
      case 2:
        return (
          <Confirm
            data={data}
            email={email}
            isSelected={isSelected}
            error={error}
            displayNotifications={displayNotifications}
          />
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div className={classes.buttonGroup}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                variant="contained"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
