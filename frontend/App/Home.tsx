import React, { SFC } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton } from '@material-ui/core';
import { Brightness4Outlined as Sun } from '@material-ui/icons'

export interface HomeProps {
	toggleTheme: () => void;
};

const Home: SFC<HomeProps> = (props) => {
	document.title = '-=- Home -=-';
	
	return <>
		<AppBar position="static">
			<Toolbar>
				<Grid container justify="flex-start">
				</Grid>
				<Grid container justify="center">

				</Grid>
				<Grid container justify="flex-end">
					<Grid item>
						<IconButton onClick={props.toggleTheme}><Sun style={{ fontSize: 32 }} /></IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	</>;
};

export default Home;