import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import useStyles from './styles';

export default function LabeledSwitch(props) {
  const classes = useStyles();
  return (
    <div key={props.value} width="100%">
      <FormControlLabel
        checked={props.checked}
        value={props.value}
        control={
          props.checkedSwitch ? <Switch edge='end' checked color="primary" /> :
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