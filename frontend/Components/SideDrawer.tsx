import React, { SFC } from 'react';
import { Drawer, List, ListItem, ListItemIcon, Typography, Button, Divider, Avatar, ListItemAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Settings, Person, ExitToApp } from '@material-ui/icons';
import DrawerButton from '../Components/DrawerButton';
import $ from 'jquery';

export interface SideDrawerProps {
	open: boolean;
	anchor: 'left' | 'right';
	onClose: () => any;
};

const useStyles = makeStyles({
	drawer: {
		width: 250
	}
});

const SideDrawer: SFC<SideDrawerProps> = (props) => {
	const classes = useStyles({});
	
	const logout = () => {
		$.ajax({
			method: 'GET',
			url: '/api/logout',
		})
		.done(() => {
			window.location.reload();
		});
	};
	
	return <Drawer open={props.open} onClose={props.onClose} anchor={props.anchor}>
		<div className={classes.drawer}>
			<List>
				<DrawerButton icon={<Person />} text="Profile" />
				<DrawerButton icon={<Settings />} text="Settings" />
				<Divider />
				<DrawerButton icon={<ExitToApp />} text="Logout" onClick={logout} />
			</List>
		</div>
	</Drawer>;
};

export default SideDrawer;