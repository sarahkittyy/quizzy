import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton, Drawer, Button } from '@material-ui/core';
import { Brightness4Outlined as Sun } from '@material-ui/icons'
import ProfileButton from '../Components/ProfileButton';
import history from '../History';
import SideDrawer from '../Components/SideDrawer';
import $ from 'jquery';

export interface HomeProps {
	toggleTheme: () => void;
};

export interface HomeState {
	sidebarOpen: boolean;
	loggedIn: boolean;
};

class Home extends Component<HomeProps, HomeState> {
	public constructor(props: HomeProps) {
		super(props);
		
		this.state = {
			sidebarOpen: false,
			loggedIn: false,
		};
	}
	
	public componentDidMount() {
		document.title = '-=- Home -=-';
		
		$.ajax({
			method: 'GET',
			url: '/api/authExpires'
		}).then((res) => {
			this.setState({...this.state, loggedIn: res.authorized});
		});
	}
	
	public render() {
		return <>
			<SideDrawer anchor="left" open={this.state.sidebarOpen} onClose={() => this.setState({...this.state, sidebarOpen: false})} />
			<AppBar position="static">
				<Toolbar>
					<Grid container justify="flex-start">
						{ this.state.loggedIn
							? <ProfileButton onClick={() => this.setState({...this.state, sidebarOpen: !this.state.sidebarOpen})} />
							: (<Button  variant="contained"
										color="secondary"
										onClick={() => history.push('/login')}>
									<Typography component="p">Login</Typography>
							   </Button>)
						}
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