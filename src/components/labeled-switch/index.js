import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useStyles from './styles';

export default function LabeledSwitch(props) {
  const classes = useStyles();
  return (
    <div key={props.value} width="100%">
      <FormControlLabel
        checked={props.checked}
        value={props.value}
        control={
          props.checkedSwitch ? <CheckCircleIcon className={classes.checked} /> :
            <Switch edge='end' disabled={props.disabled} value={props.value} onChange={e => props.onChange(e)} color="primary" />
        }
        label={props.title}
        labelPlacement="start"
        classes={{
          root: classes.root,
          label: classes.label
        }}
      />
    </div>
  )
}