import { logout } from "@redux/modules/session";
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from "react-redux";


export default () => {
  const dispatch = useDispatch()
  
  return (
    <div>
    <ListItem button onClick={() => logout(dispatch)}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItem>
    </div>
  )
}
