import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton, Drawer } from '@material-ui/core';
import { Brightness4Outlined as Sun } from '@material-ui/icons'
import ProfileButton from '../Components/ProfileButton';
import history from '../History';

export interface HomeProps {
	toggleTheme: () => void;
};

export interface HomeState {
	sidebarOpen: boolean;
};

class Home extends Component<HomeProps, HomeState> {
	public constructor(props: HomeProps) {
		super(props);
		
		this.state = {
			sidebarOpen: false,
		};
	}
	
	public componentDidMount() {
		document.title = '-=- Home -=-';
	}
	
	public render() {
	
		return <>
			<Drawer anchor="left" open={this.state.sidebarOpen} onClose={() => this.setState({...this.state, sidebarOpen: false})}>
				OwO
			</Drawer>
			<AppBar position="static">
				<Toolbar>
					<Grid container justify="flex-start">
						<ProfileButton onClick={() => this.setState({...this.state, sidebarOpen: !this.state.sidebarOpen})} />
					</Grid>
					<Grid container justify="center">

					</Grid>
					<Grid container justify="flex-end">
						<Grid item>
							<IconButton onClick={this.props.toggleTheme}><Sun style={{ fontSize: 32 }} /></IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</>;
		
	}
};

export default Home;