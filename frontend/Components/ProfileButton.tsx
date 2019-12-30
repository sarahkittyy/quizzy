import React, { SFC } from 'react';
import * as Icon from '@material-ui/icons';
import { Avatar, Fab, IconButton } from '@material-ui/core';

export interface ProfileButtonState {
	profileURL?: string;
	onClick?(): any;
};

const ProfileButton: SFC<ProfileButtonState> = (props) => {
	return <IconButton onClick={props.onClick}><Avatar src={props.profileURL}></Avatar></IconButton>;
};

export default ProfileButton;