import React from 'react';
import { SELECTED_DAPP } from '../../../graphql/queries/getDappsQueries';
import { useQuery } from '@apollo/client';
import { Typography,  Avatar, Button } from '@material-ui/core';
import LabledSwitch from '../../../components/labled-switch';
import useStyles from './select-notifications.styles';
import { useDispatch } from "react-redux";
import { updateSelectedDapp,updateSelectedNotifications } from '../notification.slice';
import { useParams } from 'react-router-dom';

export default function SelectNotifications() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dAppUuid } = useParams();
  const checkedNotifications = [];  
  const { loading, error, data } = useQuery(SELECTED_DAPP,{
    variables: { dAppUuid },
  });
 
    const handleChecked = (event) => {
        if (event.target.checked) {
            checkedNotifications.push(event.target.value);
        } else {
            checkedNotifications.pop(event.target.value);            
        } 
    };

    const handleNext = () => {
        dispatch(updateSelectedDapp(dAppUuid));
        dispatch(updateSelectedNotifications(checkedNotifications))
    }
    
    return (
    <div> 
        {
                data ?
                    <div>
                        <Avatar alt="Dapp Logo" src={data.dApps.logoUrl} className={classes.large} />
                        <Typography gutterBottom variant="h5" component="h2">
                            {data.dApps.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {data.dApps.description}
                        </Typography>  
                        {data.dApps.Notifications.map( notification => (
                            <LabledSwitch title={notification.name} onChange={handleChecked} value ={notification.uuid} />
                        ))}  
                        <Button variant="contained" color="primary" onClick ={()=>handleNext()}>
                        Next
                        </Button>              
                    </div>  
                : null          
      }
    </div>
  );
}
