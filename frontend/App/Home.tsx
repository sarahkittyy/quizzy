import React, { SFC } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton } from '@material-ui/core';
import { Brightness4 } from '@material-ui/icons'

export interface HomeProps {
	toggleTheme: () => void;
};

const Home: SFC<HomeProps> = (props) => {
	document.title = '-=- Home -=-';
	
	return <>
		<AppBar position="static">
			<Toolbar>
				<Grid container justify="flex-start">
					<Typography component="p" variant="h5" color="secondary">OwO</Typography> 
				</Grid>
				<Grid container justify="center">

				</Grid>
				<Grid container justify="flex-end">
					<Grid item>
						<IconButton onClick={props.toggleTheme}><Brightness4 /></IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	</>;
};

export default Home;