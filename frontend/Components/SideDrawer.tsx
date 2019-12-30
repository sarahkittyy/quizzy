import React, { SFC } from 'react';
import { Drawer, List, ListItem, ListItemIcon, Typography, Button, Divider, Avatar, ListItemAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Settings, Person } from '@material-ui/icons';

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
	
	return <Drawer open={props.open} onClose={props.onClose} anchor={props.anchor}>
		<div className={classes.drawer}>
			<List>
				{[['Profile', <Person />], ['Settings', <Settings />]].map(([opt, icon]: [string, JSX.Element], index) => (
				<div key={index} style={{width: '100%'}}>
					<Button style={{width: '100%'}}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItem>
							<Typography component="p">{opt}</Typography>
						</ListItem>	
					</Button>
					<br />
				</div>
				))}
			</List>
			<Divider />
		</div>
	</Drawer>;
};

export default SideDrawer;