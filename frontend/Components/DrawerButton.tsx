import React, { SFC } from 'react';
import { Button, ListItemIcon, ListItem, Typography } from '@material-ui/core';

export interface DrawerButtonProps {
	icon: JSX.Element;
	text: string;
	onClick?(): any;
};

const DrawerButton: SFC<DrawerButtonProps> = (props) => {
	return <div style={{width: '100%'}}>
		<Button style={{width: '100%'}} onClick={props.onClick}>
			<ListItemIcon>{props.icon}</ListItemIcon>
			<ListItem>
				<Typography component="p">{props.text}</Typography>
			</ListItem>	
		</Button>
		<br />
	</div>;
};

export default DrawerButton;