import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
export default function LabledSwitch(props) {

    return (
        <div key={props.value}>
        <FormControlLabel
          value={props.value}
          control={<Switch value={props.value} onChange={e => props.onChange(e)} color="primary" />}
          label={props.title}
          labelPlacement="start"
        />
        </div>
    )
}