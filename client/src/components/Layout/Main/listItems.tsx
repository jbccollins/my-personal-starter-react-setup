import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ListItemLink from '@components/ListItemLink/ListItemLink.js';
import {
  DASHBOARD,
  USERS,
} from "@shared/constants/urls";

export const mainListItems = (
  <div>
    <ListItemLink to={DASHBOARD} primary="Dashboard" icon={<DashboardIcon/>}/>
    <ListItemLink to={USERS} primary="Users" icon={<PeopleIcon/>}/>
  </div>
);